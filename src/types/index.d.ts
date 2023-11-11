export { };

declare global {
  interface Window {
    electron: any;
  }

  interface AppData {
    id: string;
    name: string;
    baseURL: string;
    currentURL: string;
  }

  interface WorkspaceType {
    name: string,
    emoji: string
  }


}
