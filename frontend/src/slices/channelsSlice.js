import {createEntityAdapter, createSlice} from '@reduxjs/toolkit';
import fetchInitialData from '../context/InitialDataThunk';

const channelsAdapter = createEntityAdapter();
const defaultCurrentChannelId = 1;

const initialState = channelsAdapter.getInitialState({currentChannelId: defaultCurrentChannelId});

const channelSlice = createSlice({
    name: 'channels',
    initialState,
    reducers: {
        addChannel: channelsAdapter.addOne,
        addChannels: channelsAdapter.addMany,
        setCurrentChannel: (state, { payload }) => {
            state.currentChannelId = payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchInitialData.fulfilled, (state, { payload }) => {
            channelsAdapter.setAll(state, payload.channels);
          })
      },
});

export const { addChannel, addChannels, setCurrentChannel } = channelSlice.actions;
export { channelsAdapter };
export default channelSlice.reducer;
