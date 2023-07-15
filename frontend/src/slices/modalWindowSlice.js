import {createEntityAdapter, createSlice} from '@reduxjs/toolkit';

const modalWindowAdapter = createEntityAdapter();
const initialState = modalWindowAdapter.getInitialState({
    isOpen: false,
    type: null,
});

const modalWindowSlice = createSlice({
    name: 'modalWindow',
    initialState,
    reducers: {
        openModalWindow: (state, { payload }) => {
            state.isOpen = true;
            state.type= payload.type;
        },

        closeModalWindow: (state, { payload }) => {
            state.isOpen = false;
        },
    }
});

export const { openModalWindow, closeModalWindow } = modalWindowSlice.actions;
export { modalWindowAdapter };
export default modalWindowSlice.reducer;
