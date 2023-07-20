import { messagesAdapter } from "../slices/messagesSlice";
import { channelsAdapter } from "../slices/channelsSlice";
import { modalWindowAdapter } from "../slices/modalWindowSlice";

export const channelsSelector = channelsAdapter.getSelectors((state) => state.channels);
export const currentChannelSelector = (state) => channelsSelector.selectById(state, state.channels.currentChannelId);
export const channelsNamesSelector = (state) => channelsSelector.selectAll(state).map((channel) => channel.name);

export const messagesSelector = messagesAdapter.getSelectors((state) => state.messages);

export const modalWindowSelector = modalWindowAdapter.getSelectors((state) => state.modalWindow);