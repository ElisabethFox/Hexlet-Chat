import {createEntityAdapter, createSlice} from '@reduxjs/toolkit';

const channelsAdapter = createEntityAdapter();
const initialState = channelsAdapter.getInitialState();

const channelSlice = createSlice({
    name: 'channels',
    initialState,
    reducers: {
        addChannel: channelsAdapter.addOne,
        addChannels: channelsAdapter.addMany,
        // deleteChannel: (state, action) => {
        //     state.channels.pop()
        // }
    }
});

export const { addChannel, addChannels } = channelSlice.actions;
export { channelsAdapter };
export default channelSlice.reducer;
