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


class CMDListTransactions(CommandBase):
	async def execute(self, request):
		"""Fetches list of txns from validator, optionally filtered by id.
		Request:
			query:
				- head: The id of the block to use as the head of the chain
				- id: Comma separated list of txn ids to include in results
		Response:
			data: JSON array of Transaction objects with expanded headers
			head: The head used for this query (most recent if unspecified)
			link: The link to this exact query, including head block
			paging: Paging info and nav, like total resources and a next link
		"""
		paging_controls = self.handler._get_paging_controls(request)
		validator_query = client_transaction_pb2.ClientTransactionListRequest(
			head_id=self.handler._get_head_id(request),
			transaction_ids=self.handler._get_filter_ids(request),
			sorting=self.handler._get_sorting_message(request, "default"),
			paging=self.handler._make_paging_message(paging_controls))

		response = await self.handler._query_validator(
			Message.CLIENT_TRANSACTION_LIST_REQUEST,
			client_transaction_pb2.ClientTransactionListResponse,
			validator_query)

		data = [self.handler._expand_transaction(t) for t in response['transactions']]

		return self.handler._wrap_paginated_response(
			request=request,
			response=response,
			controls=paging_controls,
			data=data)



class CMDFetchTransaction(CommandBase):
	async def execute(self, request):
		"""Fetches a specific transaction from the validator, specified by id.
		Request:
			path:
				- transaction_id: The 128-character id of the txn to be fetched
		Response:
			data: A JSON object with the data from the expanded Transaction
			link: The link to this exact query
		"""
		error_traps = [error_handlers.TransactionNotFoundTrap]

		txn_id = request.match_info.get('transaction_id', '')
		self.handler._validate_id(txn_id)

		response = await self.handler._query_validator(
			Message.CLIENT_TRANSACTION_GET_REQUEST,
			client_transaction_pb2.ClientTransactionGetResponse,
			client_transaction_pb2.ClientTransactionGetRequest(
				transaction_id=txn_id),
			error_traps)

		return self.handler._wrap_response(
			request,
			data=self.handler._expand_transaction(response['transaction']),
			metadata=self.handler._get_metadata(request, response))