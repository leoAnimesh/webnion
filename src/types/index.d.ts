export { };

declare global {
  interface AppData {
    name: string;
    baseURL: string;
    currentURL: string;
  }

  interface WebAppsDataType {
    apps: AppData[];
    activeApps: AppData[];
  }
}
