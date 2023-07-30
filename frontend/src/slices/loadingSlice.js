/* eslint-disable no-param-reassign */
import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import fetchInitialData from '../context/InitialDataThunk';

const loadingAdapter = createEntityAdapter();
const initialState = loadingAdapter.getInitialState({
  serverData: 'notLoaded',
});

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    unload: (state) => {
      state.serverData = 'notLoaded';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInitialData.pending, (state) => {
        state.serverData = 'loading';
      })
      .addCase(fetchInitialData.fulfilled, (state) => {
        state.serverData = 'successful';
      })
      .addCase(fetchInitialData.rejected, (state, { payload }) => {
        if (payload === 401) {
          state.serverData = 'authError';
        }
        state.serverData = 'failed';
      });
  },
});

export const { unload } = loadingSlice.actions;
export { loadingAdapter };
export default loadingSlice.reducer;
