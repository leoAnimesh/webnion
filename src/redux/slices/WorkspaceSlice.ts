import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';

const initialState: WorkSpacesType = {
  workSpaces: {
    // default: {
    //   workspaceDetails: {
    //     emoji: '🌐',
    //   },
    //   WorkspaceMenu: {
    //     id: '03220916-6c71-4d83-9545-487d09e8bc87',
    //     name: 'WebApps Menu',
    //   },
    //   webViewsObj: {},
    //   webViews: [],
    //   currentWebViewId: '03220916-6c71-4d83-9545-487d09e8bc87',
    // },
  },
  showWorkspaceModal: false,
  currentWorkSpace: '',
};

export const WorkspaceSlice = createSlice({
  name: 'webViews',
  initialState,
  reducers: {
    addWebView: (state, action: PayloadAction<WebViewData>) => {
      const data = action.payload;
      state.workSpaces[state.currentWorkSpace].currentWebViewId = data.id;
      state.workSpaces[state.currentWorkSpace].webViewsObj[data.url] = data.id;
      state.workSpaces[state.currentWorkSpace].webViews.push(data);
    },
    addWebViewScreenShot: (
      state,
      action: PayloadAction<{ imageUrl: string; id: string }>
    ) => {
      const { imageUrl, id } = action.payload;
      const { workSpaces, currentWorkSpace } = state;
      let modifiedData = workSpaces[currentWorkSpace].webViews.map((item) => {
        if (item.id === id) {
          return { ...item, screenshot: imageUrl };
        }
        return item;
      });
      workSpaces[currentWorkSpace].webViews = [...modifiedData];
    },
    changeCurrentWebView: (state, action: PayloadAction<{ id: string }>) => {
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
          return -1;
        } else if (!a.pinned && b.pinned) {
          return 1;
        } else {
          return 0;
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
  addWebViewScreenShot,
  togglePinned,
} = WorkspaceSlice.actions;

export default WorkspaceSlice.reducer;
