import { ipcMain, webContents } from 'electron';

function setupIPCHandlers() {
  // take screenshot of the webview
  ipcMain.handle('screenshot-capture-request', async (_, args) => {
    try {
      let component = webContents.fromId(args.id);
      const image = await component?.capturePage();
      const dataURL = image?.toDataURL();
      return dataURL;
    } catch (err) {
      console.log(err);
    }
  });
}

export default setupIPCHandlers;
