export {};

declare global {
  interface Window {
    electron: any;
  }

  interface AppData {
    appId: number;
    name: string;
    url: string;
    workspaceId: number;
    currentURL?: string;
  }

  interface WorkspaceType {
    id: number;
    name: string;
    icon: string;
    totalApps: number;
  }
}
