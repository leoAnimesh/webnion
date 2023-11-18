const webappsModel_sql_query = `CREATE TABLE IF NOT EXISTS Webapps (
    appId INTEGER PRIMARY KEY AUTOINCREMENT,
    name STRING,
    url STRING,
    workspaceId INTEGER NOT NULL,
    createdAt CURRENT_TIMESTAMP,
      updatedAt CURRENT_TIMESTAMP,
      FOREIGN KEY (workspaceId) REFERENCES workspaces(id) ON DELETE CASCADE
  )`

const workspaceModel_sql_query = `CREATE TABLE IF NOT EXISTS Workspaces (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name STRING NOT NULL UNIQUE,
    icon STRING,
    totalApps INTEGER DEFAULT 0,
    createdAt TIMESTAMP,
    updatedAt TIMESTAMP
)`

export {
    webappsModel_sql_query,
    workspaceModel_sql_query
}