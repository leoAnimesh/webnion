import { ipcMain } from "electron";
import workspaceController from "./controllers/workspaceController";
import WebappsController from "./controllers/WebappsController";

function setupIPCHandlers() {
  ipcMain.handle("createWorkSpace", workspaceController.createWorkspace);
  ipcMain.handle("getWorkspaces", workspaceController.getWorkspaces);
  ipcMain.handle("createWebApp", WebappsController.createWebApp);
  ipcMain.handle("getWebApps", WebappsController.getWebApps);
  ipcMain.handle("deleteWebApp", WebappsController.deleteWebApp);
  ipcMain.handle("deleteWorkspace", workspaceController.deleteWorkspace);
}

export default setupIPCHandlers;
