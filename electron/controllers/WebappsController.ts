import { db } from "../config/db";


const createWebApp = (
  _: any,
  args: { name: string; url: string; workspaceId: number }
): Promise<AppData> => {
  return new Promise(async (resolve, reject) => {
    try {
      // Step 1: Insert a new Webapp
      db.run(
        'INSERT INTO Webapps (name, url, workspaceId) VALUES (?, ?, ?)',
        [args.name, args.url, args.workspaceId],
        function (err: Error) {
          if (err) {
            reject(err);
            return;
          }

          const webappId = this.lastID;

          // Step 2: Update totalApps in Workspace
          db.run(
            'UPDATE Workspaces SET totalApps = totalApps + 1 WHERE id = ?',
            [args.workspaceId],
            function (updateErr: Error) {
              if (updateErr) {
                reject(updateErr);
              } else {
                resolve({ appId: webappId, name: args.name, url: args.url, workspaceId: args.workspaceId });
              }
            }
          );
        }
      );
    } catch (error) {
      reject(error);
    }
  });
};

const deleteWebApp = (_: any, args: { appId: number; workspaceId: number }) => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.run('DELETE FROM Webapps WHERE appId = ?', args.appId, (deleteErr: Error) => {
        if (deleteErr) {
          reject(deleteErr);
        } else {
          db.run('UPDATE Workspaces SET totalApps = totalApps - 1 WHERE id = ?', args.workspaceId, (updateErr: Error) => {
            if (updateErr) {
              reject(updateErr);
            } else {
              resolve({ success: true });
            }
          });
        }
      });
    });
  });
};

const getWebApps = (_: any, args: { workspaceId: number }) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM Webapps WHERE workspaceId = ?';

    db.all(sql, [args.workspaceId], (err: Error, rows: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

export default {
  createWebApp,
  getWebApps,
  deleteWebApp,
};
