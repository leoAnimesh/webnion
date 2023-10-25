import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface WorkspaceType {
    name: string,
    emoji: string
    activeWebAppIndex: number,
}

interface WorkSpacesType {
    workspaces: WorkspaceType[]
    activeWorkspaceIndex: number,
}

const initialState: WorkSpacesType = {
    workspaces: [],
    activeWorkspaceIndex: 0,
};

const WorkspaceSlice = createSlice({
    name: 'WebApps',
    initialState,
    reducers: {
        addWorkspace: (state, action: PayloadAction<{ name: string, emoji: string }>) => {
            const { name, emoji } = action.payload;
            state.workspaces.push({ name, emoji, activeWebAppIndex: 0 });
        },
        removeWorkspace: (state, action: PayloadAction<{ index: number }>) => {
            const { index } = action.payload;
            state.workspaces.splice(index, 1);
        },
        setActiveWorkspaceIndex: (state, action: PayloadAction<number>) => {
            state.activeWorkspaceIndex = action.payload;
        },
        setActiveWebAppIndex: (state, action: PayloadAction<{ index: number }>) => {
            state.workspaces[state.activeWorkspaceIndex] = { ...state.workspaces[state.activeWorkspaceIndex], activeWebAppIndex: action.payload.index };
        }
    },
});

export const { setActiveWebAppIndex, setActiveWorkspaceIndex, removeWorkspace, addWorkspace } = WorkspaceSlice.actions;

export default WorkspaceSlice.reducer;