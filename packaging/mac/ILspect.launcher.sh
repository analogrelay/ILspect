#!/bin/sh
DIR=$(dirname $0)

[ ! -z "$ILSPECT_MONO_PATH" ] || ILSPECT_MONO_PATH="/Library/Frameworks/Mono.framework/Commands/mono"
[ ! -z "$ILSPECT_APP_PATH" ] || ILSPECT_APP_PATH="$DIR/../Resources/bin/ILspect.exe"
[ ! -z "$ILSPECT_ELECTRON_PATH" ] || ILSPECT_ELECTRON_PATH="$DIR/../Frameworks/Electron.app/Contents/MacOS/Electron"
[ ! -z "$ILSPECT_ELECTRON_ROOT" ] || ILSPECT_ELECTRON_ROOT="$DIR/../Resources/wwwroot"

if [ ! -e "$ILSPECT_MONO_PATH" ]; then
    osascript -e 'tell app "System Events" to display dialog "Unable to find Mono. Install Mono from the Mac PKG before using this."'
    exit 1
fi

$ILSPECT_MONO_PATH $ILSPECT_MONO_FLAGS $ILSPECT_APP_PATH --electron-path $ILSPECT_ELECTRON_PATH --electron-root $ILSPECT_ELECTRON_ROOT >> $LOG
