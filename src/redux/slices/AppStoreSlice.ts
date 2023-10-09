import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const defaultApp = {
    name: 'Home',
    baseURL: 'https://www.google.com',
    currentURL: 'https://www.google.com',
};

const defaultWorkspace = { emoji: '🌐', name: 'Default', activeAppIndex: 0 }

const initialState: AppsStoreType = {
    activeWorkspaceIndex: 0,
    allApps: { 0: [defaultApp] },
    allWorkspaces: [defaultWorkspace],
};

const AppStoreSlice = createSlice({
    name: 'AppsStore',
    initialState,
    reducers: {
        addDefaultAddAppToWorkspace: (state, action: PayloadAction<{ workspaceIndex: number }>) => {
            const { workspaceIndex } = action.payload;
            return {
                ...state,
                allApps: { ...state.allApps, [workspaceIndex]: [defaultApp] }
            }
        },
        addWebAppToWorkspace: (state, action: PayloadAction<{ name: string, url: string }>) => {
            const { name, url } = action.payload;
            return {
                ...state,
                allApps: { ...state.allApps, [state.activeWorkspaceIndex]: [...state.allApps[state.activeWorkspaceIndex], { name, baseURL: url, currentURL: url }] }
            }
        },
        addWorkspace: (state, action: PayloadAction<{ name: string, emoji: string }>) => {
            const { name, emoji } = action.payload;
            return {
                ...state,
                allWorkspaces: [...state.allWorkspaces, { name, emoji, activeAppIndex: 0 }]
            }
        },
        switchWorkspace: (state, action: PayloadAction<number>) => {
            return {
                ...state,
                activeWorkspaceIndex: action.payload
            }
        },
        changeActiveAppIndex: (state, action: PayloadAction<{ currentIndex: number }>) => {
            state.allWorkspaces[state.activeWorkspaceIndex].activeAppIndex = action.payload.currentIndex;
        }
    },
});

export const { addWebAppToWorkspace, addDefaultAddAppToWorkspace, switchWorkspace, addWorkspace, changeActiveAppIndex } = AppStoreSlice.actions;

export default AppStoreSlice.reducer;