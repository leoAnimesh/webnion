import { ipcMain, webContents } from 'electron';

function setupIPCHandlers() {
  // take screenshot of the webview
  ipcMain.handle('screenshot-capture-request', (_, args: { id: number }) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (!args.id) reject({ message: 'No webview id provided' });
        let component = webContents.fromId(args.id);
        const image = await component?.capturePage();
        const dataURL = image?.toDataURL();
        return resolve({ image: dataURL });
      } catch (err) {
        reject(err);
      }
    })
  })
}

export default setupIPCHandlers