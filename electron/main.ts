import { app, BrowserWindow } from "electron";
import path from "node:path";
import setupIPCHandlers from "./ipcHandler";

process.env.DIST = path.join(__dirname, "../");
process.env.PUBLIC = app.isPackaged
  ? process.env.DIST
  : path.join(process.env.DIST, "../public");

process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";

let win: BrowserWindow | null;
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];

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
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(process.env.DIST, "index.html"));
  }
}

app.on("window-all-closed", () => {
  win = null;
});

app.whenReady().then(async () => {
  createWindow();
  setupIPCHandlers();
});
