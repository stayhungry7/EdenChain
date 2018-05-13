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

class CMDListState(CommandBase):
	async def execute(self, request):
		"""Fetches list of data entries, optionally filtered by address prefix.
		Request:
			query:
				- head: The id of the block to use as the head of the chain
				- address: Return entries whose addresses begin with this
				prefix
		Response:
			data: An array of leaf objects with address and data keys
			head: The head used for this query (most recent if unspecified)
			link: The link to this exact query, including head block
			paging: Paging info and nav, like total resources and a next link
		"""
		paging_controls = self.handler._get_paging_controls(request)

		head, root = await self.handler._head_to_root(request.url.query.get(
			'head', None))
		validator_query = client_state_pb2.ClientStateListRequest(
			state_root=root,
			address=request.url.query.get('address', None),
			sorting=self.handler._get_sorting_message(request, "default"),
			paging=self.handler._make_paging_message(paging_controls))

		response = await self.handler._query_validator(
			Message.CLIENT_STATE_LIST_REQUEST,
			client_state_pb2.ClientStateListResponse,
			validator_query)

		return self.handler._wrap_paginated_response(
			request=request,
			response=response,
			controls=paging_controls,
			data=response.get('entries', []),
			head=head)


class CMDFetchState(CommandBase):
	async def execute(self, request):
		"""Fetches data from a specific address in the validator's state tree.
		Request:
			query:
				- head: The id of the block to use as the head of the chain
				- address: The 70 character address of the data to be fetched
		Response:
			data: The base64 encoded binary data stored at that address
			head: The head used for this query (most recent if unspecified)
			link: The link to this exact query, including head block
		"""
		error_traps = [
			error_handlers.InvalidAddressTrap,
			error_handlers.StateNotFoundTrap]

		address = request.match_info.get('address', '')
		head = request.url.query.get('head', None)

		head, root = await self.handler._head_to_root(head)
		response = await self.handler._query_validator(
			Message.CLIENT_STATE_GET_REQUEST,
			client_state_pb2.ClientStateGetResponse,
			client_state_pb2.ClientStateGetRequest(
				state_root=root, address=address),
			error_traps)

		return self.handler._wrap_response(
			request,
			data=response['value'],
			metadata=self.handler._get_metadata(request, response, head=head))



class CMDFetchStatus(CommandBase):
	async def execute(self, request):
		'''Fetches information pertaining to the valiator's status.'''

		response = await self.handler._query_validator(
			Message.CLIENT_STATUS_GET_REQUEST,
			client_status_pb2.ClientStatusGetResponse,
			client_status_pb2.ClientStatusGetRequest())

		return self.handler._wrap_response(
			request,
			data={
				'peers': response['peers'],
				'endpoint': response['endpoint']
			},
			metadata=self.handler._get_metadata(request, response))