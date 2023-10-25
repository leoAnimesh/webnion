export { };

declare global {
  interface Window {
    electron: any;
  }

  interface AppData {
    id: number;
    name: string;
    baseURL: string;
    currentURL: string;
  }

}
