import * as path from 'path';
import * as url from 'url';

import { app, BrowserWindow } from "electron";

import { BuddyProcess } from "./BuddyProcess";

const root = path.resolve(__dirname, "..", "..");
const htmlDir = path.join(root, "html");
const serverDir = path.join(root, "server");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win: BrowserWindow | null;

async function createWindow() {
  // Spawn the buddy process
  console.log("Starting buddy process...");
  let buddy = new BuddyProcess(path.join(serverDir, "src", "ILspect.Server", "bin", "Debug", "netcoreapp2.0", "ILspect.Server.dll"));
  await buddy.start();
  console.log(`Buddy process listening at url: ${buddy.url}`);

  // Create the browser window.
  win = new BrowserWindow({ width: 800, height: 600 });

  // and load the index.html of the app.
  win.loadURL(url.format({
    pathname: path.join(htmlDir, 'index.html'),
    query: {
      ["serverUrl"]: buddy.url
    },
    protocol: 'file:',
    slashes: true
  }));

  // Open the DevTools.
  win.webContents.openDevTools({
    mode: "detach"
  });

  // Emitted when the window is closed.
  win.on('closed', () => {
    buddy.stop();
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => { console.log("ready"); createWindow() });

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});