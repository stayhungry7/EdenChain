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

import os
import sys
import logging
import asyncio
import argparse
from urllib.parse import urlparse
import platform
import pkg_resources
from aiohttp import web

from zmq.asyncio import ZMQEventLoop
from pyformance import MetricsRegistry
from pyformance.reporters import InfluxReporter

from sawtooth_sdk.processor.log import init_console_logging
from sawtooth_sdk.processor.log import log_configuration
from sawtooth_sdk.processor.config import get_log_config
from sawtooth_sdk.processor.config import get_log_dir
from sawtooth_sdk.processor.config import get_config_dir

from messaging import Connection
from config.api_config import APIConfig
from config.rest_api_config import RestApiConfig
from common.metric_registry import MetricsRegistryWrapper

from command.base_cmd_handler import *
from command.cmd_batch import *
from command.cmd_block import *
from command.cmd_misc import *
from command.cmd_status import *
from command.cmd_transaction import *

from subscription.base_subscription_handler import *
from subscription.sub_subscription import *


LOGGER = logging.getLogger(__name__)

class APIServer:
    def __init__(self):
        self.apiconfig = APIConfig()
        self.loop = None
        self.connection = None
        self.url = None
        self.host = None
        self.port = None
        
        self.app = None
        self.handler = None
        self.subscriber_handler = None

    def set_url(self):
        self.url = None
        if "tcp://" not in self.apiconfig.config.connect:
            self.url = "tcp://" + self.apiconfig.config.connect
        else:
            self.url = self.apiconfig.config.connect

    def set_host_port(self):
        try:
            self.host, self.port = self.apiconfig.config.bind[0].split(":")
            self.port = int(self.port)
        except ValueError as e:
            print("Unable to parse binding {}: Must be in the format"
                  " host:port".format(self.apiconfig.config.bind[0]))
            sys.exit(1)

    def load_config(self,filename):
        self.apiconfig.load(filename)
        self.set_url()
        self.set_host_port()

    def set_log_config(self):
        log_config = get_log_config(filename="rest_api_log_config.toml")

        # If no toml, try loading yaml
        if log_config is None:
            log_config = get_log_config(filename="rest_api_log_config.yaml")

        if log_config is not None:
            log_configuration(log_config=log_config)
        else:
            log_dir = get_log_dir()
            log_configuration(log_dir=log_dir, name="rest_api")
        init_console_logging(verbose_level=0)


    def load_handlers(self,app,loop,connection,timeout,registry):
        self.handler = CommandHandler(loop, connection, timeout, registry)

        app.router.add_post('/batches', CMDSubmitBatches(self.handler).execute)
        app.router.add_get('/batch_statuses', CMDListStatuses(self.handler).execute)
        app.router.add_post('/batch_statuses', CMDListStatuses(self.handler).execute)

        app.router.add_get('/batches', CMDListBatches(self.handler).execute)
        app.router.add_get('/batches/{batch_id}', CMDFetchBatch(self.handler).execute)

        app.router.add_get('/state', CMDListState(self.handler).execute)
        app.router.add_get('/state/{address}', CMDFetchState(self.handler).execute)

        app.router.add_get('/blocks', CMDListBlocks(self.handler).execute)
        app.router.add_get('/blocks/{block_id}', CMDFetchBlock(self.handler).execute)


        app.router.add_get('/transactions', CMDListTransactions(self.handler).execute)
        app.router.add_get(
            '/transactions/{transaction_id}',
            CMDFetchTransaction(self.handler).execute)

        app.router.add_get('/receipts', CMDListReceipts(self.handler).execute)
        app.router.add_post('/receipts', CMDListReceipts(self.handler).execute)

        app.router.add_get('/peers', CMDFetchPeers(self.handler).execute)
        app.router.add_get('/status', CMDFetchStatus(self.handler).execute)

        self.subscriber_handler = StateDeltaSubscriberHandler(connection)
        app.router.add_get('/subscriptions', SUBSubscriptions(self.subscriber_handler).execute)
        app.on_shutdown.append(lambda app: self.subscriber_handler.on_shutdown())


    def start_server(self, host, port, connection, timeout, registry, client_max_size=None):
        """Builds the web app, adds route handlers, and finally starts the app.
        """
        loop = asyncio.get_event_loop()
        connection.open()

        self.app = web.Application(loop=loop, client_max_size=client_max_size)
        self.app.on_cleanup.append(lambda app: connection.close())

        self.load_handlers(self.app,loop,connection, timeout, registry)

        # Add routes to the web app
        LOGGER.info('Creating handlers for validator at %s', connection.url)

        # Start app
        LOGGER.info('Starting REST API on %s:%s', host, port)

        web.run_app(
            self.app,
            host=host,
            port=port,
            access_log=LOGGER,
            access_log_format='%r: %s status, %b size, in %Tf s')


    def execute(self):
        self.set_log_config()

        self.loop = ZMQEventLoop()
        asyncio.set_event_loop(self.loop)

        self.connection = None
        try:        

            self.connection = Connection(self.url)

            wrapped_registry = None

            self.start_server(
                self.host,
                self.port,
                self.connection,
                int(self.apiconfig.config.timeout),
                wrapped_registry,
                client_max_size=self.apiconfig.config.client_max_size)
            # pylint: disable=broad-except

        except Exception as e:
            LOGGER.exception(e)
            sys.exit(1)
        finally:
            if self.connection is not None:
                self.connection.close()



if __name__== "__main__":
    a_server = APIServer()
    a_server.load_config('rest_api_config.toml')
    a_server.execute()
