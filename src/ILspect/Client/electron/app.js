'use strict';

const fs = require('fs');
const electron = require('electron');
const child_process = require('child_process');
const path = require('path');

// Module to control application life.
const app = electron.app;

// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

(function(rootDir) {
    console.log("info: Starting backend server process");

    // argv[0] => electron
    // argv[1] => "path/to/main/js"
    // argv[2] => [port] 
    let port = process.argv[2];

    function createWindow () {
        // Create the browser window.
        mainWindow = new BrowserWindow({
            width: 1024,
            height: 768,
            webPreferences: {
                directWrite: false // Stops blurry font on Windows
            }
        });

        // Set up the app menu
        Menu.setApplicationMenu(require('./menu')(mainWindow));
        
        mainWindow.webContents.on('did-finish-load', function() {
            mainWindow.webContents.send('server-info', {
                url: `http://localhost:${port}`
            });
        });

        // and load the index.html of the app.
        var rootPage = path.join(rootDir, "../index.html");
        mainWindow.loadURL('file://' + rootPage);

        // Open the DevTools.
        mainWindow.webContents.openDevTools({detach: true});
        
        // Emitted when the window is closed.
        mainWindow.on('closed', function() {
            // Dereference the window object, usually you would store windows
            // in an array if your app supports multi windows, this is the time
            // when you should delete the corresponding element.
            mainWindow = null;
        });
    }

    // This method will be called when Electron has finished
    // initialization and is ready to create browser windows.
    app.on('ready', createWindow);

    // Quit when all windows are closed.
    app.on('window-all-closed', function () {
        // On OS X it is common for applications and their menu bar
        // to stay active until the user quits explicitly with Cmd + Q
        if (process.platform !== 'darwin') {
            app.quit();
        }
    });

    app.on('activate', function () {
        // On OS X it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (mainWindow === null) {
            createWindow();
        }
    });
})(__dirname);