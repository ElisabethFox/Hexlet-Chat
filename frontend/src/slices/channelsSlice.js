import { createSlice } from '@reduxjs/toolkit';
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

const usersChannels = await getChannels();

const initialState = {
    channels: [...usersChannels]
};

const channelSlice = createSlice({
    name: 'channels',
    initialState,
    reducers: {
        addChannel: (state, action) => {
            state.channels = [...state, action.payload]
        },
        deleteChannel: (state, action) => {
            state.channels.pop()
        }
    }
});

export const { addChannel, deleteChannel } = channelSlice.actions;
export default channelSlice.reducer;
