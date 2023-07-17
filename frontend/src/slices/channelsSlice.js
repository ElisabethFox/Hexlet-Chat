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
        setCurrentChannel: (state, { payload }) => {
            state.currentChannelId = payload;
        },
        removeChannel: channelsAdapter.removeOne,
        renameChannel: channelsAdapter.updateOne,
    },
    extraReducers: (builder) => {
        builder.addCase(fetchInitialData.fulfilled, (state, { payload }) => {
            channelsAdapter.setAll(state, payload.channels);
          })
      },
});

export const { addChannel, addChannels, setCurrentChannel, removeChannel,renameChannel } = channelSlice.actions;
export { channelsAdapter };
export default channelSlice.reducer;
