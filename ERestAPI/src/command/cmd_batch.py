# Copyright 2016 Intel Corporation
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
# ------------------------------------------------------------------------------

# Modifications by 2018 EdenChain *


from command.base_cmd_handler import *


class CMDSubmitBatches(CommandBase):
    async def execute(self, request):
        """Accepts a binary encoded BatchList and submits it to the validator.
        Request:
            body: octet-stream BatchList of one or more Batches
        Response:
            status:
                 - 202: Batches submitted and pending
            link: /batches or /batch_statuses link for submitted batches
        """
        timer_ctx = self.handler._post_batches_total_time.time()
        self.handler._post_batches_count.inc()

        # Parse request
        if request.headers['Content-Type'] != 'application/octet-stream':
            LOGGER.debug(
                'Submission headers had wrong Content-Type: %s',
                request.headers['Content-Type'])
            self.handler._post_batches_error.inc()
            raise errors.SubmissionWrongContentType()

        body = await request.read()
        if not body:
            LOGGER.debug('Submission contained an empty body')
            self.handler._post_batches_error.inc()
            raise errors.NoBatchesSubmitted()

        try:
            batch_list = BatchList()
            batch_list.ParseFromString(body)
        except DecodeError:
            LOGGER.debug('Submission body could not be decoded: %s', body)
            self.handler._post_batches_error.inc()
            raise errors.BadProtobufSubmitted()

        # Query validator
        error_traps = [error_handlers.BatchInvalidTrap,
                       error_handlers.BatchQueueFullTrap]
        validator_query = client_batch_submit_pb2.ClientBatchSubmitRequest(
            batches=batch_list.batches)

        with self.handler._post_batches_validator_time.time():
            await self.handler._query_validator(
                Message.CLIENT_BATCH_SUBMIT_REQUEST,
                client_batch_submit_pb2.ClientBatchSubmitResponse,
                validator_query,
                error_traps)

        # Build response envelope
        id_string = ','.join(b.header_signature for b in batch_list.batches)

        status = 202
        link = self.handler._build_url(request, path='/batch_statuses', id=id_string)

        retval = self.handler._wrap_response(
            request,
            metadata={'link': link},
            status=status)

        timer_ctx.stop()
        return retval


class CMDListBatches(CommandBase):
    async def execute(self, request):
        """Fetches list of batches from validator, optionally filtered by id.
        Request:
            query:
                - head: The id of the block to use as the head of the chain
                - id: Comma separated list of batch ids to include in results
        Response:
            data: JSON array of fully expanded Batch objects
            head: The head used for this query (most recent if unspecified)
            link: The link to this exact query, including head block
            paging: Paging info and nav, like total resources and a next link
        """
        paging_controls = self.handler._get_paging_controls(request)
        validator_query = client_batch_pb2.ClientBatchListRequest(
            head_id=self.handler._get_head_id(request),
            batch_ids=self.handler._get_filter_ids(request),
            sorting=self.handler._get_sorting_message(request, "default"),
            paging=self.handler._make_paging_message(paging_controls))

        response = await self.handler._query_validator(
            Message.CLIENT_BATCH_LIST_REQUEST,
            client_batch_pb2.ClientBatchListResponse,
            validator_query)

        return self.handler._wrap_paginated_response(
            request=request,
            response=response,
            controls=paging_controls,
            data=[self.handler._expand_batch(b) for b in response['batches']])


class CMDFetchBatch(CommandBase):
    async def execute(self, request):
        """Fetches a specific batch from the validator, specified by id.
        Request:
            path:
                - batch_id: The 128-character id of the batch to be fetched
        Response:
            data: A JSON object with the data from the fully expanded Batch
            link: The link to this exact query
        """
        error_traps = [error_handlers.BatchNotFoundTrap]

        batch_id = request.match_info.get('batch_id', '')
        self.handler._validate_id(batch_id)

        response = await self.handler._query_validator(
            Message.CLIENT_BATCH_GET_REQUEST,
            client_batch_pb2.ClientBatchGetResponse,
            client_batch_pb2.ClientBatchGetRequest(batch_id=batch_id),
            error_traps)

        return self.handler._wrap_response(
            request,
            data=self.handler._expand_batch(response['batch']),
            metadata=self.handler._get_metadata(request, response))


class CMDListStatuses(CommandBase):
    async def execute(self, request):
        """Fetches the committed status of batches by either a POST or GET.
        Request:
            body: A JSON array of one or more id strings (if POST)
            query:
                - id: A comma separated list of up to 15 ids (if GET)
                - wait: Request should not return until all batches committed
        Response:
            data: A JSON object, with batch ids as keys, and statuses as values
            link: The /batch_statuses link queried (if GET)
        """
        error_traps = [error_handlers.StatusResponseMissing]

        # Parse batch ids from POST body, or query paramaters
        if request.method == 'POST':
            if request.headers['Content-Type'] != 'application/json':
                LOGGER.debug(
                    'Request headers had wrong Content-Type: %s',
                    request.headers['Content-Type'])
                raise errors.StatusWrongContentType()

            ids = await request.json()

            if (not ids
                    or not isinstance(ids, list)
                    or not all(isinstance(i, str) for i in ids)):
                LOGGER.debug('Request body was invalid: %s', ids)
                raise errors.StatusBodyInvalid()
            for i in ids:
                self.handler._validate_id(i)

        else:
            ids = self.handler._get_filter_ids(request)
            if not ids:
                LOGGER.debug('Request for statuses missing id query')
                raise errors.StatusIdQueryInvalid()

        # Query validator
        validator_query = \
            client_batch_submit_pb2.ClientBatchStatusRequest(
                batch_ids=ids)
        self.handler._set_wait(request, validator_query)

        response = await self.handler._query_validator(
            Message.CLIENT_BATCH_STATUS_REQUEST,
            client_batch_submit_pb2.ClientBatchStatusResponse,
            validator_query,
            error_traps)

        # Send response
        if request.method != 'POST':
            metadata = self.handler._get_metadata(request, response)
        else:
            metadata = None

        data = self.handler._drop_id_prefixes(
            self.handler._drop_empty_props(response['batch_statuses']))

        return self.handler._wrap_response(request, data=data, metadata=metadata)