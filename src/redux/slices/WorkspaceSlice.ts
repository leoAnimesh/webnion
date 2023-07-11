import { PayloadAction, createSlice } from '@reduxjs/toolkit';
// import type { RootState } from '../store';
import { v4 as uuid } from 'uuid';
interface WebView {
  id: string;
  name: string;
  url: string;
  active: boolean;
}

interface WorkspaceDetails {
  emoji: string;
}

interface Workspace {
  workspaceDetails: WorkspaceDetails;
  webViews: WebView[];
  currentWebViewId: string;
}

interface WorkSpaces {
  workSpaces: {
    [key: string]: Workspace;
  };
  sideBarExpanded: boolean;
  showWorkspaceModal: boolean;
  currentWorkSpace: string;
}

const initialState: WorkSpaces = {
  workSpaces: {
    default: {
      workspaceDetails: {
        emoji: '🌐',
      },
      webViews: [
        {
          id: '03220916-6c71-4d83-9545-487d09e8bc87',
          name: 'Google',
          url: 'https://google.com',
          active: true,
        },
      ],
      currentWebViewId: '03220916-6c71-4d83-9545-487d09e8bc87',
    },
  },
  sideBarExpanded: false,
  showWorkspaceModal: false,
  currentWorkSpace: 'default',
};

export const WorkspaceSlice = createSlice({
  name: 'webViews',
  initialState,
  reducers: {
    addWebView: (state, action: PayloadAction<WebView>) => {
      state.workSpaces[state.currentWorkSpace].currentWebViewId =
        action.payload.id;
      state.workSpaces[state.currentWorkSpace].webViews.push(action.payload);
      // state.currentWebViewId = action.payload.id;
      // state.webViews.push(action.payload);
    },
    changeCurrentWebView: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload;
      state.workSpaces[state.currentWorkSpace].currentWebViewId = id;
    },
    deleteWebAppEntry: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload;
      return {
        ...state,
        workSpaces: {
          ...state.workSpaces,
          [state.currentWorkSpace]: {
            ...state.workSpaces[state.currentWorkSpace],
            webViews: [
              ...state.workSpaces[state.currentWorkSpace].webViews,
            ].filter((item) => item.id !== id),
          },
        },
      };
    },
    toggleSideBarExtended: (state) => {
      state.sideBarExpanded = !state.sideBarExpanded;
    },
    toggleActivenessWebView: (
      state,
      action: PayloadAction<{ id: string; active: boolean }>
    ) => {
      const { id, active } = action.payload;
      return {
        ...state,
        workSpaces: {
          ...state.workSpaces,
          [state.currentWorkSpace]: {
            ...state.workSpaces[state.currentWorkSpace],
            webViews: [
              ...state.workSpaces[state.currentWorkSpace].webViews,
            ].map((item) => {
              if (item.id === id) {
                return {
                  ...item,
                  active: active,
                };
              }
              return item;
            }),
          },
        },
      };
    },
    toggleManageWorkspaceModal: (state) => {
      state.showWorkspaceModal = !state.showWorkspaceModal;
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
        webViews: [
          {
            id,
            name: 'Google',
            url: 'https://google.com',
            active: true,
          },
        ],
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
  toggleActivenessWebView,
  deleteWebAppEntry,
  toggleManageWorkspaceModal,
  addWorkSpace,
  switchWorkSpace,
  toggleSideBarExtended,
} = WorkspaceSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.webviews.value

export default WorkspaceSlice.reducer;
