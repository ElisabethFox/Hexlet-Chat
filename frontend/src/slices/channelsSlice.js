import {createEntityAdapter, createSlice} from '@reduxjs/toolkit';
import axios from "axios";

const currentUser = JSON.parse(localStorage.getItem('user'))
const token = currentUser.token

const getChannels = async () => {
    try {
        const response = await axios.get('/api/v1/data', { headers: { Authorization: `Bearer ${token}` } })
        return response.data.channels
    } catch (error) {
        console.error(error);
        return null;
    }
}

const channelsAdapter = createEntityAdapter();
const initialState = channelsAdapter.getInitialState();

// const usersChannels = await getChannels();

// const initialState = {
//     channels: [...usersChannels]
// };

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
