import {messagesAdapter} from "../slices/messagesSlice";
import {channelsAdapter} from "../slices/channelsSlice";

export const channelsSelector = channelsAdapter.getSelectors((state) => state.channels);
export const messagesSelector = messagesAdapter.getSelectors((state) => state.messages);