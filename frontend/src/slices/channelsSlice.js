import {createEntityAdapter, createSlice} from '@reduxjs/toolkit';
import fetchInitialData from '../context/InitialDataThunk';

const channelsAdapter = createEntityAdapter();
const initialState = channelsAdapter.getInitialState();

const channelSlice = createSlice({
    name: 'channels',
    initialState,
    reducers: {
        addChannel: channelsAdapter.addOne,
        addChannels: channelsAdapter.addMany,
    },
    extraReducers: (builder) => {
        builder.addCase(fetchInitialData.fulfilled, (state, { payload }) => {
            channelsAdapter.setAll(state, payload.channels);
          })
      },
});

export const { addChannel, addChannels } = channelSlice.actions;
export { channelsAdapter };
export default channelSlice.reducer;
