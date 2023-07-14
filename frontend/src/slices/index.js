import {configureStore} from "@reduxjs/toolkit";
import channelReducer from './channelsSlice';
import messageReducer from './messagesSlice';
import modalWindowReducer from './modalWindowSlice';

export default configureStore({
    reducer: {
        channels: channelReducer,
        messages: messageReducer,
        modalWindow: modalWindowReducer,
    }
})
