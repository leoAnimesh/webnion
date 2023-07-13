export interface WebViewData {
  id: string;
  name: string;
  url: string;
  pinned: boolean;
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
