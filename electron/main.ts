import { app, BrowserWindow } from "electron";
import path from "node:path";
import setupIPCHandlers from "./ipcHandler";
import { createTables } from "./config/db";


process.env.DIST = path.join(__dirname, '../dist')
process.env.VITE_PUBLIC = app.isPackaged ? process.env.DIST : path.join(process.env.DIST, '../public')


let win: BrowserWindow | null
// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']


function createWindow() {
  win = new BrowserWindow({
    roundedCorners: true,
    trafficLightPosition: {
      x: 10,
      y: 10,
    },
    icon: path.join(process.env.PUBLIC, "electron-vite.svg"),
    width: 1280,
    height: 900,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
      webviewTag: true,
      plugins: true,
    },
  });

  win.setMenuBarVisibility(true);
  // Test active push message to Renderer-process.
  win.webContents.on("did-finish-load", () => {
    win?.webContents.send("main-process-message", new Date().toLocaleString());
  });

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    win.loadFile(path.join(process.env.DIST, 'index.html'))
  }
  win.center();
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    win = null
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
    createTables();
    setupIPCHandlers();
  }
})

app.whenReady().then(() => {
  createWindow();
  createTables();
  setupIPCHandlers();
})

