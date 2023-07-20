import { contextBridge, ipcRenderer } from 'electron';

const WINDOW_API = {
  sendIpcRequest: (channel: string, data: any) =>
    ipcRenderer.invoke(channel, data),
};

contextBridge.exposeInMainWorld('electron', WINDOW_API);
