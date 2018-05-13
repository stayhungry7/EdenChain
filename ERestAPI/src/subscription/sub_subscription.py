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

from subscription.base_subscription_handler import *


class SUBSubscriptions(SubscriptionBase):
    async def execute(self, request):
        """
        Handles requests for new subscription websockets.
        Args:
            request (aiohttp.Request): the incoming request
        Returns:
            aiohttp.web.WebSocketResponse: the websocket response, when the
                resulting websocket is closed
        """

        if not self._accepting:
            return web.Response(status=503)

        web_sock = web.WebSocketResponse()
        await web_sock.prepare(request)

        async for msg in web_sock:
            if msg.type == aiohttp.WSMsgType.TEXT:
                await self.handler._handle_message(web_sock, msg.data)
            elif msg.type == aiohttp.WSMsgType.ERROR:
                LOGGER.warning(
                    'Web socket connection closed with exception %s',
                    web_sock.exception())
                await web_sock.close()

        await self.handler._handle_unsubscribe(web_sock)

        return web_sock
