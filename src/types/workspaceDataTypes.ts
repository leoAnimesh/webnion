export interface WebViewData {
  id: string;
  name: string;
  url: string;
  pinned: boolean;
  screenshot?: string;
}

export interface WorkspaceDetails {
  emoji: string;
}

export interface WorkspaceDataType {
  workspaceDetails: WorkspaceDetails;
  WorkspaceMenu: {
    id: string;
    name: string;
  };
  webViewsObj: { [key: string]: string };
  webViews: WebViewData[];
  currentWebViewId: string;
}

export interface WorkSpacesType {
  workSpaces: {
    [key: string]: WorkspaceDataType;
  };
  showWorkspaceModal: boolean;
  currentWorkSpace: string;
}

export interface WorkSpaceTodos {
  todo: string;
  id: string;
  date: Date;
  done: boolean;
  completedAt: Date | string;
}

export interface WorkSpaceDataType {
  workSpaceData: { [key: string]: { todos: WorkSpaceTodos[] } };
}
