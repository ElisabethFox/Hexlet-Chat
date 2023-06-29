import {configureStore} from "@reduxjs/toolkit";
import channelReducer from './channelsSlice';
import messageReducer from './messagesSlice'

export default configureStore({
    reducer: {
        channels: channelReducer,
        messages: messageReducer,
    }
})
