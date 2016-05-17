#!/usr/bin/env bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

pushd $DIR/src/ILspect
dotnet restore
npm install
pushd $DIR/src/ILspect/Client
typings install
popd
gulp compile
dotnet build
popd
