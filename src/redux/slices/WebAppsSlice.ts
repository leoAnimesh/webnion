import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: WebAppsDataType = {
    activeApps: []
};

const webAppsSlice = createSlice({
    name: 'WebApps',
    initialState,
    reducers: {
        loadActiveWebApp: (state, action: PayloadAction<{ app: AppData, activeIndex: number }>) => {
            const { app, activeIndex } = action.payload
            let temp = [...state.activeApps];
            temp[activeIndex] = app;
            return {
                ...state,
                activeApps: temp,
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
            return state;
        },
    },
});

export const { loadActiveWebApp, addToActiveApps } = webAppsSlice.actions;

export default webAppsSlice.reducer;