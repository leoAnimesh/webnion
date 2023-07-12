import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface Conditions {
  showAddWenViewModal: boolean;
  sideBarExpanded: boolean;
}

const initialState: Conditions = {
  showAddWenViewModal: false,
  sideBarExpanded: false,
};

export const ConditionsSlice = createSlice({
  name: 'conditions',
  initialState,
  reducers: {
    toggleAddWenViewModal: (state) => {
      state.showAddWenViewModal = !state.showAddWenViewModal;
    },
    togglesideBarExpanded: (state, actions: PayloadAction<boolean>) => {
      state.sideBarExpanded = actions.payload;
    },
  },
});

export const { toggleAddWenViewModal, togglesideBarExpanded } =
  ConditionsSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.webviews.value

export default ConditionsSlice.reducer;
