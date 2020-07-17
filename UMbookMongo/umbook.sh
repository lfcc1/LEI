#!/bin/bash

mongoimport --db UMbook-AuthServer --collection conversas --file /povoamento/conversas.json --jsonArray && \
mongoimport --db UMbook-AuthServer --collection mensagens --file /povoamento/mensagens.json --jsonArray