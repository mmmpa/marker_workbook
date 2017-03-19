#!/bin/sh

docker build . -f Dockerfile.frontend -t marker_workbook_frontend
docker run -v $PWD/_container_data/node_modules:/root/workspace/src/node_modules -v $PWD/frontend:/root/workspace -it marker_workbook_frontend
