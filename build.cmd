@echo off
setlocal

pushd %~dp0\src\ILspect
call npm install
dotnet restore
dotnet build
call gulp
popd
