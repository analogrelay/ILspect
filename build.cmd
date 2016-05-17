@echo off
setlocal

where node >nul 2>nul || goto missing_node
where npm >nul 2>nul || goto missing_node
where gulp >nul 2>nul || goto missing_gulp
where typings >nul 2>nul || goto missing_typings

pushd %~dp0src\ILspect
dotnet restore
call npm install
pushd %~dp0src\ILspect\Client
call typings install
popd
call gulp compile
dotnet build
popd

goto end

:missing_node
echo NodeJS is required to build ILspect. Please install it and put 'node' and 'npm' on your PATH
exit 1

:missing_gulp
echo Gulp is required to build ILspect. Please install it via 'npm install -g gulp-cli'
exit 1

:missing_typings
echo Typings is required to build ILspect. Please install it via 'npm install -g typings'
exit 1

:end
