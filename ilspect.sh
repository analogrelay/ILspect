#!/bin/sh
pushd $(dirname $0) > /dev/null
SCRIPT_PATH=$(pwd)
popd > /dev/null

dotnet "$SCRIPT_PATH/src/ILspect.CommandLine/bin/Debug/netcoreapp2.0/ILspect.CommandLine.dll" "$@"
