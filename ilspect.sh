#!/bin/sh
pushd $(dirname $0) > /dev/null
SCRIPT_PATH=$(pwd)
popd > /dev/null

dotnet build --configuration "Release" "$SCRIPT_PATH/test/ILspect.TestLibrary/ILspect.TestLibrary.csproj"
dotnet run --project "$SCRIPT_PATH/src/ILspect.CommandLine/ILspect.CommandLine.csproj" -- "$@"