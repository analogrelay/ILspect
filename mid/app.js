'use strict';

const fs = require('fs');
const electron = require('electron');
const child_process = require('child_process');

// Module to control application life.
const app = electron.app;

// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

module.exports = function(rootDir) {
    // Allocate a port
    let port = 20201; // TODO: Find a better port

    console.log("info: Starting backend server process");

    let newEnv = Object.create(process.env);
    newEnv["PORT"] = port;

    let server_executable = "./back/src/ILspect.Server/bin/Debug/netcoreapp1.0/publish/ILspect.Server.dll";

    if(!fs.existsSync(server_executable)) {
        console.log(`error: unable to find executable: ${server_executable}`)
        app.quit();
    }

    const server_process = child_process.spawn("dotnet", [
        server_executable
    ], {
        cwd: rootDir,
        env: newEnv,
        stdio: "inherit"
    });

    server_process.on('exit', (code) => {
        console.log(`server process exited with code ${code}`);
        app.quit();
    })

    function createWindow () {
        // Create the browser window.
        mainWindow = new BrowserWindow({width: 800, height: 600});

        // Set up the app menu
        Menu.setApplicationMenu(require('./menu')(mainWindow));
        
        mainWindow.webContents.on('did-finish-load', function() {
            mainWindow.webContents.send('server-info', {
                url: `http://localhost:${port}`
            });
        });

        // and load the index.html of the app.
        mainWindow.loadURL('file://' + rootDir + '/front/index.html');

        // Open the DevTools.
        mainWindow.webContents.openDevTools();
        
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

    app.on('before-quit', function() {
        server_process.kill(); 
    });
}