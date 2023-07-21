import { PayloadAction, createSlice } from '@reduxjs/toolkit';

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
    markTodoAsDone: (
      state,
      action: PayloadAction<{ id: string; currentWorkSpace: string }>
    ) => {
      const { id, currentWorkSpace } = action.payload;
      let modifiedData = state.workSpaceData[currentWorkSpace].todos.map(
        (item) => {
          if (item.id === id) {
            return { ...item, done: true };
          }
          return item;
        }
      );
      state.workSpaceData[currentWorkSpace].todos = [...modifiedData];
    },
  },
});

export const { addTodo, deleteTodo, markTodoAsDone } =
  WorkSpaceDataSlice.actions;

export default WorkSpaceDataSlice.reducer;
