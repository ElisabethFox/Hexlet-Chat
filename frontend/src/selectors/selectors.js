import { messagesAdapter } from '../slices/messagesSlice';
import { channelsAdapter } from '../slices/channelsSlice';
import { modalWindowAdapter } from '../slices/modalWindowSlice';

const channelsSelector = channelsAdapter.getSelectors((state) => state.channels);
const currentChannelSelector = (state) => channelsSelector.selectById(state, state.channels.currentChannelId);
const channelsNamesSelector = (state) => channelsSelector.selectAll(state).map((channel) => channel.name);

const messagesSelector = messagesAdapter.getSelectors((state) => state.messages);

const modalWindowSelector = modalWindowAdapter.getSelectors((state) => state.modalWindow);

export { channelsSelector,
  currentChannelSelector,
  channelsNamesSelector,
  messagesSelector,
  modalWindowSelector };
