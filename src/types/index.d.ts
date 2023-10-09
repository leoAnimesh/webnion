export { };

declare global {
  interface Window {
    electron: any;
  }

  interface AppsStoreType {
    activeWorkspaceIndex: number;
    allApps: { [key: number]: AppData[] };
    allWorkspaces: WorkSpaceData[]
  }

  interface AppData {
    name: string;
    baseURL: string;
    currentURL: string;
  }

  interface WorkSpaceData {
    emoji: string;
    name: string;
    activeAppIndex: number
  }
  interface WebAppsDataType {
    activeApps: AppData[];
  }

  interface WorkSpacesDataType {
    activeAppIndex: number;
  }
}
