import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const HomeApp = {
    name: 'Home',
    baseURL: 'https://www.google.com',
    currentURL: 'https://www.google.com',
};

const initialState: WebAppsDataType = {
    apps: [HomeApp],
    activeApps: [HomeApp],
};

const webAppsSlice = createSlice({
    name: 'WebApps',
    initialState,
    reducers: {
        loadWebApps: (state, action: PayloadAction<AppData[]>) => {
            return {
                ...state,
                apps: [...action.payload]
            }
        },
        addWebApp: (state, action: PayloadAction<{ name: string, url: string }>) => {
            const { name, url } = action.payload;
            return {
                ...state,
                apps: [...state.apps, { name, baseURL: url, currentURL: url }]
            }
        },
        addToActiveApps: (state, action: PayloadAction<{ index: number, webApp: AppData }>) => {
            const { index, webApp } = action.payload;
            const isAvailable = state.activeApps.find((_, idx) => idx === index)
            if (!isAvailable) {
                const ActiveAppsCopy = [...state.activeApps];
                ActiveAppsCopy[index] = webApp;
                return {
                    ...state,
                    activeApps: [...ActiveAppsCopy]
                }
            }

            return state
        }
    },
});

export const { loadWebApps, addWebApp, addToActiveApps } = webAppsSlice.actions;

export default webAppsSlice.reducer;