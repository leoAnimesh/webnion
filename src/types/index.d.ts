export {};

declare global {
  interface Window {
    electron: any;
  }
  interface WebViewData {
    id: string;
    name: string;
    url: string;
    pinned: boolean;
    screenshot?: string;
  }

  interface WorkspaceDetails {
    emoji: string;
  }

  interface WorkspaceDataType {
    workspaceDetails: WorkspaceDetails;
    WorkspaceMenu: {
      id: string;
      name: string;
    };
    webViewsObj: { [key: string]: string };
    webViews: WebViewData[];
    currentWebViewId: string;
  }

  interface WorkSpacesType {
    workSpaces: {
      [key: string]: WorkspaceDataType;
    };
    showWorkspaceModal: boolean;
    currentWorkSpace: string;
  }

  interface WorkSpaceTodos {
    todo: string;
    id: string;
    date: Date;
    done: boolean;
    completedAt: Date | string;
  }

  interface WorkSpaceDataType {
    workSpaceData: { [key: string]: { todos: WorkSpaceTodos[] } };
  }
}
