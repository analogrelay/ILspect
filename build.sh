#!/usr/bin/env bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

pushd $DIR/src/ILspect
npm install
dotnet restore
dotnet build
gulp
popd
