import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  WorkSpaceDataType,
  WorkSpaceTodos,
} from '../../types/workspaceDataTypes';

const initialState: WorkSpaceDataType = {
  workSpaceData: {
    default: {
      todos: [],
    },
  },
};

const WorkSpaceDataSlice = createSlice({
  name: 'workspaceData',
  initialState,
  reducers: {
    addTodo: (
      state,
      action: PayloadAction<{ data: WorkSpaceTodos; currentWorkSpace: string }>
    ) => {
      const { data, currentWorkSpace } = action.payload;
      state.workSpaceData[currentWorkSpace].todos.push(data);
    },
    deleteTodo: (
      state,
      action: PayloadAction<{ id: string; currentWorkSpace: string }>
    ) => {
      const { id, currentWorkSpace } = action.payload;
      let filteredData = state.workSpaceData[currentWorkSpace].todos.filter(
        (item) => item.id !== id
      );
      state.workSpaceData[currentWorkSpace].todos = [...filteredData];
    },
  },
});

export const { addTodo, deleteTodo } = WorkSpaceDataSlice.actions;

export default WorkSpaceDataSlice.reducer;
