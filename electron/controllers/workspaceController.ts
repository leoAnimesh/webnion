import { db } from "../config/db";


const createWorkspace = (
  _: any,
  args: { name: string; icon: string }
): Promise<WorkspaceType> => {
  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO Workspaces (name, icon) VALUES (?,?)`;

    db.serialize(() => {
      db.run(sql, [args.name, args.icon], function (err: Error) {
        if (err) {
          reject(err);
        } else {
          const insertedWorkspaceId = this.lastID;
          resolve({ id: insertedWorkspaceId, totalApps: 0, name: args.name, icon: args.icon });
        }
      });
    });
  });

};

const getWorkspaces = (): Promise<WorkspaceType[]> => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM Workspaces';

    db.all(sql, (err: Error, rows: WorkspaceType[]) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

const deleteWorkspace = (_: any, args: { workspaceId: number }) => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      // Step 1: Delete Webapps associated with the workspace
      db.run('DELETE FROM Webapps WHERE workspaceId = ?', [args.workspaceId], function (webappDeleteErr: Error) {
        if (webappDeleteErr) {
          reject(webappDeleteErr);
          return;
        }

        // Step 2: Delete the Workspace itself
        db.run('DELETE FROM Workspaces WHERE id = ?', [args.workspaceId], function (workspaceDeleteErr: Error) {
          if (workspaceDeleteErr) {
            reject(workspaceDeleteErr);
          } else {
            resolve(this.changes);
          }
        });
      });
    });
  });
};

export default {
  createWorkspace,
  getWorkspaces,
  deleteWorkspace,
};
