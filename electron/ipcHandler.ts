import { ipcMain, webContents } from 'electron';

function setupIPCHandlers() {
  // take screenshot of the webview
  ipcMain.handle('screenshot-capture-request', async (_, args) => {
    try {
      if (!args.id) throw new Error('No webview id provided');
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
