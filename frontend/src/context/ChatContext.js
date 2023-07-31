import axios from 'axios';
import { createContext } from 'react';
import { useDispatch } from 'react-redux';
import { addChannel, setCurrentChannel } from '../slices/channelsSlice';
import { chatContextRoutes } from '../routes';

export const ChatContext = createContext({});

const ChatContextProvider = ({ socket, children }) => {
  const dispatch = useDispatch();
  const timeout = 4000;

  const addNewMessage = async (message) => {
    await socket
      .timeout(timeout)
      .emit('newMessage', message);
  };

  const addNewChannel = async (channel) => {
    const { data } = await socket
      .timeout(timeout)
      .emitWithAck('newChannel', channel);

    dispatch(addChannel(data));
    dispatch(setCurrentChannel(data.id));
  };

  const removeSelectedChannel = async (id) => {
    await socket
      .timeout(timeout)
      .emit('removeChannel', { id });
  };

  const renameSelectedChannel = async (updateChannel) => {
    await socket
      .timeout(timeout)
      .emit('renameChannel', updateChannel);
  };

  const getServerData = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const response = await axios.get(chatContextRoutes.data(), { headers: { Authorization: `Bearer ${user.token}` } });
    return response;
  };

  return (
    <ChatContext.Provider value={{
      addNewMessage,
      addNewChannel,
      removeSelectedChannel,
      renameSelectedChannel,
      getServerData,
    }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContextProvider;
