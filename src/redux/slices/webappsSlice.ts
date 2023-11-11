import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface WebappsType {
  activeWebAppIndex: number;
  apps: AppData[];
}

const initialState: WebappsType = {
  activeWebAppIndex: 0,
  apps: [],
};

const webAppsSlice = createSlice({
  name: "WebApps",
  initialState,
  reducers: {
    addWebApp: (state, action: PayloadAction<{ app: AppData }>) => {
      state.apps.push(action.payload.app);
    },
    setWebApps: (state, action: PayloadAction<{ apps: AppData[] }>) => {
      state.apps = action.payload.apps;
    },
    removeWebApp: (state, action: PayloadAction<{ id: number }>) => {
      const { id } = action.payload;
      let temp = [];
      temp = state.apps.filter((app) => app.appId !== id);
      return {
        ...state,
        activeWebAppIndex:
          state.activeWebAppIndex > 0
            ? state.activeWebAppIndex - 1
            : initialState.activeWebAppIndex,
        apps: temp,
      };
    },
    setActiveWebAppIndex: (state, action: PayloadAction<number>) => {
      state.activeWebAppIndex = action.payload;
    },
    clearWebApps: (state) => {
      state.apps = initialState.apps;
    },
  },
});

export const {
  addWebApp,
  setWebApps,
  removeWebApp,
  setActiveWebAppIndex,
  clearWebApps,
} = webAppsSlice.actions;

export default webAppsSlice.reducer;
