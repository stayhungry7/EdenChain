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

class CMDListBlocks(CommandBase):
    async def execute(self, request):
        """Fetches list of blocks from validator, optionally filtered by id.
        Request:
            query:
                - head: The id of the block to use as the head of the chain
                - id: Comma separated list of block ids to include in results
        Response:
            data: JSON array of fully expanded Block objects
            head: The head used for this query (most recent if unspecified)
            link: The link to this exact query, including head block
            paging: Paging info and nav, like total resources and a next link
        """
        paging_controls = self.handler._get_paging_controls(request)
        validator_query = client_block_pb2.ClientBlockListRequest(
            head_id=self.handler._get_head_id(request),
            block_ids=self.handler._get_filter_ids(request),
            sorting=self.handler._get_sorting_message(request, "block_num"),
            paging=self.handler._make_paging_message(paging_controls))

        response = await self.handler._query_validator(
            Message.CLIENT_BLOCK_LIST_REQUEST,
            client_block_pb2.ClientBlockListResponse,
            validator_query)

        return self.handler._wrap_paginated_response(
            request=request,
            response=response,
            controls=paging_controls,
            data=[self.handler._expand_block(b) for b in response['blocks']])



class CMDFetchBlock(CommandBase):
    async def execute(self, request):
        """Fetches a specific block from the validator, specified by id.
        Request:
            path:
                - block_id: The 128-character id of the block to be fetched
        Response:
            data: A JSON object with the data from the fully expanded Block
            link: The link to this exact query
        """
        error_traps = [error_handlers.BlockNotFoundTrap]

        block_id = request.match_info.get('block_id', '')
        self.handler._validate_id(block_id)

        response = await self.handler._query_validator(
            Message.CLIENT_BLOCK_GET_BY_ID_REQUEST,
            client_block_pb2.ClientBlockGetResponse,
            client_block_pb2.ClientBlockGetByIdRequest(block_id=block_id),
            error_traps)

        return self.handler._wrap_response(
            request,
            data=self.handler._expand_block(response['block']),
            metadata=self.handler._get_metadata(request, response))