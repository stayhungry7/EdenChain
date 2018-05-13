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


class CMDListReceipts(CommandBase):
    async def execute(self, request):
        """Fetches the receipts for transaction by either a POST or GET.
        Request:
            body: A JSON array of one or more transaction id strings (if POST)
            query:
                - id: A comma separated list of up to 15 ids (if GET)
                - wait: Request should return as soon as some receipts are
                    available
        Response:
            data: A JSON object, with transaction ids as keys, and receipts as
                values
            link: The /receipts link queried (if GET)
        """
        error_traps = [error_handlers.ReceiptNotFoundTrap]

        # Parse transaction ids from POST body, or query paramaters
        if request.method == 'POST':
            if request.headers['Content-Type'] != 'application/json':
                LOGGER.debug(
                    'Request headers had wrong Content-Type: %s',
                    request.headers['Content-Type'])
                raise errors.ReceiptWrongContentType()

            ids = await request.json()

            if (not ids
                    or not isinstance(ids, list)
                    or not all(isinstance(i, str) for i in ids)):
                LOGGER.debug('Request body was invalid: %s', ids)
                raise errors.ReceiptBodyInvalid()
            for i in ids:
                self.handler._validate_id(i)

        else:
            ids = self.handler._get_filter_ids(request)
            if not ids:
                LOGGER.debug('Request for receipts missing id query')
                raise errors.ReceiptIdQueryInvalid()

        # Query validator
        validator_query = \
            client_receipt_pb2.ClientReceiptGetRequest(
                transaction_ids=ids)
        self.handler._set_wait(request, validator_query)

        response = await self.handler._query_validator(
            Message.CLIENT_RECEIPT_GET_REQUEST,
            client_receipt_pb2.ClientReceiptGetResponse,
            validator_query,
            error_traps)

        # Send response
        if request.method != 'POST':
            metadata = self.handler._get_metadata(request, response)
        else:
            metadata = None

        data = self.handler._drop_id_prefixes(
            self.handler._drop_empty_props(response['receipts']))

        return self.handler._wrap_response(request, data=data, metadata=metadata)



class CMDFetchPeers(CommandBase):
    async def execute(self, request):
        """Fetches the peers from the validator.
        Request:
        Response:
            data: JSON array of peer endpoints
            link: The link to this exact query
        """

        response = await self.handler._query_validator(
            Message.CLIENT_PEERS_GET_REQUEST,
            client_peers_pb2.ClientPeersGetResponse,
            client_peers_pb2.ClientPeersGetRequest())

        return self.handler._wrap_response(
            request,
            data=response['peers'],
            metadata=self.handler._get_metadata(request, response))
