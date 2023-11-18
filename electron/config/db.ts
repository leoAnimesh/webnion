import { app } from "electron";
import path from "path";
const sqlite3 = require('sqlite3').verbose();

import { webappsModel_sql_query, workspaceModel_sql_query } from '../models'

const db = new sqlite3.Database(app.isPackaged ? path.join(app.getPath("userData"), "webnion.db") : './webnion.db', (error: Error) => {
  if (error) {
    console.error(error.message);
  }
  console.log('Connected to the database.');
});

const migrateDb = () => {
  db.parallelize(() => {
    db.run(workspaceModel_sql_query);
    db.run(webappsModel_sql_query);
  });
};

export {
  migrateDb,
  db,
}