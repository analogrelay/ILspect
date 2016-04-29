@echo off
setlocal

pushd %~dp0\src\ILspect
dotnet run -- %*
popd
