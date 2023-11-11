import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface WebappsType {
    activeWebAppId?: string,
    apps: { [key: number]: AppData[] }
}

const initialState: WebappsType = {
    activeWebAppId: '',
    apps: {},
};

const webAppsSlice = createSlice({
    name: 'WebApps',
    initialState,
    reducers: {
        addWebApp: (state, action: PayloadAction<{ workspaceIndex: number, app: AppData }>) => {
            const { workspaceIndex, app } = action.payload;
            if (!state.apps[workspaceIndex]) {
                state.apps[workspaceIndex] = [];
            }
            state.apps[workspaceIndex].push(app);
        },
        removeWebApp: (state, action: PayloadAction<{ workspaceIndex: number, id: string }>) => {
            const { workspaceIndex, id } = action.payload;
            state.apps[workspaceIndex] = state.apps[workspaceIndex].filter((app) => app.id !== id);
        },
        setActiveWebAppId: (state, action: PayloadAction<string>) => {
            state.activeWebAppId = action.payload;
        }
    },
});

export const { addWebApp, removeWebApp, setActiveWebAppId } = webAppsSlice.actions;

export default webAppsSlice.reducer;