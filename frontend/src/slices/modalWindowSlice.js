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
        },
        closeModalWindow: (state, { payload }) => {
            state.isOpen = false;
        },
        setCurrentModalType: (state, { payload }) => {
            state.type = payload;
        },
    }
});

export const { openModalWindow, closeModalWindow, setCurrentModalType } = modalWindowSlice.actions;
export { modalWindowAdapter };
export default modalWindowSlice.reducer;
