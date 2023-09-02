import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';
/**
 * Slice Structure
 workSpaces: {
    // default stand for the workspace names
    default: {
      workspaceDetails: {
        id: '03220916-6c71-4d83-9545-487d09e8bc87',
        emoji: '🌐',
      },
      webViewsObj: {
        'https:example.com' : '03220916-6c71-4d83-9545-487d09e8bc87',
      },
      webViews: [
        {
          id: '03220916-6c71-4d83-9545-487d09e8bc87',
          name: 'Google',
          url: 'https://example.com',
          pinned: false,
          screenshot?: 'screenshort-blob-string',
        }
      ],
      currentWebViewId: '03220916-6c71-4d83-9545-487d09e8bc87',
    },
  },
  showWorkspaceModal: false,
  currentWorkSpace: '',
 */
const initialState: WorkSpacesType = {
  workSpaces: {},
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
      action: PayloadAction<{ id: string; url: string; index: number }>
    ) => {
      const { id, url, index } = action.payload;
      let filterData = state.workSpaces[state.currentWorkSpace].webViews.filter(
        (item) => item.id !== id
      );

      console.log(filterData);

      delete state.workSpaces[state.currentWorkSpace].webViewsObj[url];
      if (state.workSpaces[state.currentWorkSpace].webViews.length === 1) {
        state.workSpaces[state.currentWorkSpace].currentWebViewId =
          state.workSpaces[state.currentWorkSpace].workspaceDetails.menu_id;
      } else {
        state.workSpaces[state.currentWorkSpace].currentWebViewId =
          state.workSpaces[state.currentWorkSpace].webViews[index - 1].id;
      }
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
          menu_id: id,
          emoji,
        },
        webViewsObj: {},
        webViews: [],
        currentWebViewId: id,
      };
      state.currentWorkSpace = name;
      state.showWorkspaceModal = false;
    },
    editWorkspaceData: (
      state,
      action: PayloadAction<{
        data: { name: string; emoji: string };
        workspaceName: string;
      }>
    ) => {
      const { data, workspaceName } = action.payload;
      if (
        data.emoji !== state.workSpaces[workspaceName].workspaceDetails.emoji
      ) {
        state.workSpaces[workspaceName] = {
          ...state.workSpaces[workspaceName],
          workspaceDetails: {
            ...state.workSpaces[workspaceName].workspaceDetails,
            emoji: data.emoji,
          },
        };
        return;
      }

      if (data.name !== workspaceName) {
        state.workSpaces[data.name] = state.workSpaces[workspaceName];
        delete state.workSpaces[workspaceName];
      }
    },
    deleteWorkspace: (
      state,
      action: PayloadAction<{ selectedWorkspace: string; index: number }>
    ) => {
      const { selectedWorkspace, index } = action.payload;
      delete state.workSpaces[selectedWorkspace];
      let temp = Object.entries(state.workSpaces).sort((a, b) =>
        a[1].webViews.length < b[1].webViews.length ? 1 : -1
      );
      if (index == 0) {
        state.currentWorkSpace = '';
        return;
      }
      state.currentWorkSpace = temp[index - 1][0];
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
  deleteWorkspace,
  editWorkspaceData,
} = WorkspaceSlice.actions;

export default WorkspaceSlice.reducer;
