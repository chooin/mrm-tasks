#!/bin/bash

docker-compose -f docker-compose.testing.yml build
docker-compose -f docker-compose.testing.yml up -d