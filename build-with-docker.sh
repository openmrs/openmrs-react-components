#!/bin/bash

usage () {
    echo -e "Expects one of the following arguments: "
    echo -e "ci - runs npm ci"
    echo -e "test - runs npm run test"
    echo -e "cypress-test - runs npm run cypress-test.  For this option, expects username, password, and url to be passed as subsequent arguments.  eg. admin Admin123 localhost:8080/"
    echo -e "build - runs npm run build.  For this option, the build number should be passed in as the second argument"
    echo -e "If no argument is passed, executes ci, followed by test, followed by build"
}

npmci() {
  docker run --rm \
    -v $(pwd):/data \
    -w="/data" \
    node:14 \
    npm ci
}

npmtest() {
  docker run --rm \
    -v $(pwd):/data \
    -w="/data" \
    node:14 \
    npm run test:update-snapshots
}

npmlint() {
  docker run --rm \
    -v $(pwd):/data \
    -w="/data" \
    node:14 \
    npm run lint
}

npmpack() {
  docker run --rm \
    -v $(pwd):/data \
    -w="/data" \
    node:14 \
    npm run pack
}

npmci
npmtest
npmlint
npmpack
