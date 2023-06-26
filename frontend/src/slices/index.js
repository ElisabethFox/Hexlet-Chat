import {configureStore} from "@reduxjs/toolkit";
import channelReducer from './channelsSlice';

export default configureStore({
    reducer: {
        channels: channelReducer,
    }
})
