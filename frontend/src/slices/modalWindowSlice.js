import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

const modalWindowAdapter = createEntityAdapter();
const initialState = modalWindowAdapter.getInitialState({
  isOpen: false,
  type: null,
  relevantChannel: null,
});

const modalWindowSlice = createSlice({
  name: 'modalWindow',
  initialState,
  reducers: {
    openModalWindow: (state) => {
      state.isOpen = true;
    },
    closeModalWindow: (state) => {
      state.isOpen = false;
    },
    setCurrentModalType: (state, { payload }) => {
      state.type = payload;
    },
    setRelevantChannel: (state, { payload }) => {
      state.relevantChannel = payload;
    },
  }
});

export const { openModalWindow,
    closeModalWindow,
    setCurrentModalType,
    setRelevantChannel } = modalWindowSlice.actions;
export { modalWindowAdapter };
export default modalWindowSlice.reducer;
