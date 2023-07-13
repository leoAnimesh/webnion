import { PayloadAction, createSlice } from '@reduxjs/toolkit';
// import type { RootState } from '../store';
import { v4 as uuid } from 'uuid';
interface WebView {
  id: string;
  name: string;
  url: string;
  pinned: boolean;
}

interface WorkspaceDetails {
  emoji: string;
}

interface Workspace {
  workspaceDetails: WorkspaceDetails;
  WorkspaceMenu: {
    id: string;
    name: string;
  };
  webViewsObj: { [key: string]: string };
  webViews: WebView[];
  currentWebViewId: string;
}

interface WorkSpaces {
  workSpaces: {
    [key: string]: Workspace;
  };
  showWorkspaceModal: boolean;
  currentWorkSpace: string;
}

const initialState: WorkSpaces = {
  workSpaces: {
    default: {
      workspaceDetails: {
        emoji: '🌐',
      },
      WorkspaceMenu: {
        id: '03220916-6c71-4d83-9545-487d09e8bc87',
        name: 'WebApps Menu',
      },
      webViewsObj: {},
      webViews: [],
      currentWebViewId: '03220916-6c71-4d83-9545-487d09e8bc87',
    },
  },
  showWorkspaceModal: false,
  currentWorkSpace: 'default',
};

export const WorkspaceSlice = createSlice({
  name: 'webViews',
  initialState,
  reducers: {
    addWebView: (state, action: PayloadAction<WebView>) => {
      const data = action.payload;
      state.workSpaces[state.currentWorkSpace].currentWebViewId = data.id;
      state.workSpaces[state.currentWorkSpace].webViewsObj[data.url] = data.id;
      state.workSpaces[state.currentWorkSpace].webViews.push(data);
    },
    changeCurrentWebView: (state, action: PayloadAction<{ id: any }>) => {
      const { id } = action.payload;
      state.workSpaces[state.currentWorkSpace].currentWebViewId = id;
    },
    deleteWebAppEntry: (
      state,
      action: PayloadAction<{ id: string; url: string }>
    ) => {
      const { id, url } = action.payload;
      let filterData = state.workSpaces[state.currentWorkSpace].webViews.filter(
        (item) => item.id !== id
      );
      delete state.workSpaces[state.currentWorkSpace].webViewsObj[url];
      state.workSpaces[state.currentWorkSpace].webViews = [...filterData];
    },
    toggleManageWorkspaceModal: (state) => {
      state.showWorkspaceModal = !state.showWorkspaceModal;
    },
    togglePinned: (
      state,
      action: PayloadAction<{ id: string; pinned: boolean }>
    ) => {
      const { id, pinned } = action.payload;
      const { workSpaces, currentWorkSpace } = state;
      let updatedData = workSpaces[currentWorkSpace].webViews.map((item) => {
        if (item.id === id) {
          return { ...item, pinned };
        }
        return item;
      });
      updatedData.sort((a, b) => {
        if (a.pinned && !b.pinned) {
          return -1; // a comes before b
        } else if (!a.pinned && b.pinned) {
          return 1; // b comes before a
        } else {
          return 0; // the order remains unchanged
        }
      });
      state.workSpaces[currentWorkSpace].webViews = [...updatedData];
    },
    addWorkSpace: (
      state,
      action: PayloadAction<{ name: string; emoji: string }>
    ) => {
      const { name, emoji } = action.payload;
      let id = uuid();
      state.workSpaces[name] = {
        workspaceDetails: {
          emoji,
        },
        WorkspaceMenu: {
          id: id,
          name: 'WebApps Menu',
        },
        webViewsObj: {},
        webViews: [],
        currentWebViewId: id,
      };
      state.currentWorkSpace = name;
      state.showWorkspaceModal = false;
    },
    switchWorkSpace: (state, action: PayloadAction<{ name: string }>) => {
      const { name } = action.payload;
      state.currentWorkSpace = name;
      state.showWorkspaceModal = false;
    },
  },
});

export const {
  addWebView,
  changeCurrentWebView,
  deleteWebAppEntry,
  toggleManageWorkspaceModal,
  addWorkSpace,
  switchWorkSpace,
  togglePinned,
} = WorkspaceSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.webviews.value

export default WorkspaceSlice.reducer;
