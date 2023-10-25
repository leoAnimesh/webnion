import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface AppData {
    id: string;
    name: string;
    baseURL: string;
    currentURL: string;
}

interface WebappsType {
    [key: number]: AppData[]
}

const initialState: WebappsType = {};

const webAppsSlice = createSlice({
    name: 'WebApps',
    initialState,
    reducers: {
        addWebApp: (state, action: PayloadAction<{ workspaceIndex: number, app: AppData }>) => {
            const { workspaceIndex, app } = action.payload;
            if (!state[workspaceIndex]) {
                state[workspaceIndex] = [];
            }
            state[workspaceIndex].push(app);
        },
        removeWebApp: (state, action: PayloadAction<{ workspaceIndex: number, app: AppData }>) => {
            const { workspaceIndex, app } = action.payload;
            state[workspaceIndex] = state[workspaceIndex].filter((webApp) => webApp.name !== app.name);
        },
    },
});

export const { addWebApp, removeWebApp } = webAppsSlice.actions;

export default webAppsSlice.reducer;