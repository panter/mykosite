#!/bin/bash

rm -rf bundle
mkdir bundle
meteor build --architecture=os.linux.x86_64 bundle
docker build --tag=registry.lan:5000/mykosite:latest .
docker push registry.lan:5000/mykosite:latest
