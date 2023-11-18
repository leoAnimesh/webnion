const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./db.sqlite', (error: Error) => {
  if (error) {
    console.error(error.message);
  }
  console.log('Connected to the database.');
});

const createTables = () => {
  db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS Webapps (
        appId INTEGER PRIMARY KEY AUTOINCREMENT,
        name STRING,
        url STRING,
        workspaceId INTEGER NOT NULL,
        createdAt CURRENT_TIMESTAMP,
          updatedAt CURRENT_TIMESTAMP,
          FOREIGN KEY (workspaceId) REFERENCES workspaces(id) ON DELETE CASCADE
      )`)
    db.run(`CREATE TABLE IF NOT EXISTS Workspaces (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name STRING NOT NULL UNIQUE,
        icon STRING,
        totalApps INTEGER DEFAULT 0,
        createdAt TIMESTAMP,
        updatedAt TIMESTAMP
    )`)
  });
};

export {
  createTables,
  db,
}