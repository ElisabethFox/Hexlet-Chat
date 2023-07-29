import { configureStore } from '@reduxjs/toolkit';
import channelReducer from './channelsSlice';
import messageReducer from './messagesSlice';
import modalWindowReducer from './modalWindowSlice';
import loadingReducer from './loadingSlice';

export default configureStore({
  reducer: {
    channels: channelReducer,
    messages: messageReducer,
    modalWindow: modalWindowReducer,
    loading: loadingReducer,
  },
});
