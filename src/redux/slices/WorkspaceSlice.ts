import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface WorkSpacesType {
  workspaces: WorkspaceType[];
  activeWorkspaceIndex: number;
}

const initialState: WorkSpacesType = {
  workspaces: [],
  activeWorkspaceIndex: 0,
};

const WorkspaceSlice = createSlice({
  name: "workspaces",
  initialState,
  reducers: {
    addWorkspace: (state, action: PayloadAction<WorkspaceType>) => {
      state.workspaces.push(action.payload);
    },
    setWorkspace: (
      state,
      action: PayloadAction<{ workspaces: WorkspaceType[] }>
    ) => {
      state.workspaces = action.payload.workspaces;
    },
    setActiveWorkspaceIndex: (state, action: PayloadAction<number>) => {
      state.activeWorkspaceIndex = action.payload;
    },
    updateTotalWorkspaceApps: (
      state,
      action: PayloadAction<{
        workspaceId: number;
        mode: "increment" | "decrement";
      }>
    ) => {
      const { workspaceId, mode } = action.payload;
      let temp = [];
      temp = state.workspaces.map((item) => {
        if (item.id === workspaceId) {
          return {
            ...item,
            totalApps:
              mode === "increment" ? item.totalApps + 1 : item.totalApps - 1,
          };
        }
        return item;
      });
      state.workspaces = temp;
    },
    removeWorkspace: (
      state,
      action: PayloadAction<{ workspaceId: number }>
    ) => {
      const { workspaceId } = action.payload;
      let temp = [];
      temp = state.workspaces.filter((item) => item.id !== workspaceId);
      return {
        ...state,
        activeWorkspaceIndex:
          state.activeWorkspaceIndex > 0
            ? state.activeWorkspaceIndex - 1
            : initialState.activeWorkspaceIndex,
        workspaces: temp,
      };
    },
  },
});

export const {
  setActiveWorkspaceIndex,
  removeWorkspace,
  addWorkspace,
  setWorkspace,
  updateTotalWorkspaceApps,
} = WorkspaceSlice.actions;

export default WorkspaceSlice.reducer;
