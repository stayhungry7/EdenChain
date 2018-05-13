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

import collections
import logging
import os
import toml

from exceptions import RestApiConfigurationError

class RestApiConfig:
    def __init__(
            self,
            bind=None,
            connect=None,
            timeout=None,
            opentsdb_url=None,
            opentsdb_db=None,
            opentsdb_username=None,
            opentsdb_password=None,
            client_max_size=None):
        self._bind = bind
        self._connect = connect
        self._timeout = timeout
        self._opentsdb_url = opentsdb_url
        self._opentsdb_db = opentsdb_db
        self._opentsdb_username = opentsdb_username
        self._opentsdb_password = opentsdb_password
        self._client_max_size = client_max_size

    @property
    def bind(self):
        return self._bind

    @property
    def connect(self):
        return self._connect

    @property
    def timeout(self):
        return self._timeout

    @property
    def opentsdb_url(self):
        return self._opentsdb_url

    @property
    def opentsdb_db(self):
        return self._opentsdb_db

    @property
    def opentsdb_username(self):
        return self._opentsdb_username

    @property
    def opentsdb_password(self):
        return self._opentsdb_password

    @property
    def client_max_size(self):
        return self._client_max_size

    def __repr__(self):
        # skip opentsdb_db password
        return \
            "{}(bind={}, connect={}, timeout={}," \
            "opentsdb_url={}, opentsdb_db={}, opentsdb_username={}," \
            "client_max_size={})" \
            .format(
                self.__class__.__name__,
                repr(self._bind),
                repr(self._connect),
                repr(self._timeout),
                repr(self._opentsdb_url),
                repr(self._opentsdb_db),
                repr(self._opentsdb_username),
                repr(self._client_max_size))

    def to_dict(self):
        return collections.OrderedDict([
            ('bind', self._bind),
            ('connect', self._connect),
            ('timeout', self._timeout),
            ('opentsdb_url', self._opentsdb_url),
            ('opentsdb_db', self._opentsdb_db),
            ('opentsdb_username', self._opentsdb_username),
            ('opentsdb_password', self._opentsdb_password),
            ('client_max_size', self._client_max_size)
        ])

    def to_toml_string(self):
        return str(toml.dumps(self.to_dict())).strip().split('\n')
