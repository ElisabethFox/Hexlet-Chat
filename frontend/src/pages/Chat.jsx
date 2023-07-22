import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useChatApi } from '../hooks/hooks';
import fetchInitialData from '../context/InitialDataThunk';
import { messagesSelector, currentChannel } from '../selectors/selectors';
import ChannelsPanel from '../components/chat/channels-panel/ChannelsPanel';
import ChatPanel from '../components/chat/chat-panel/ChatPanel';
import ModalWindow from '../components/modal/ModalWindow';
import MessageBox from '../components/chat/MessageBox';
import MessageForm from '../components/chat/MessageForm';

const Chat = () => {
  const dispatch = useDispatch();
  const { connectSocket, disconnectSocket, getChannelsData } = useChatApi();
  const messages = useSelector(messagesSelector.selectAll);
  const currentChannelData = useSelector(currentChannel);
  const currentChannelName = currentChannel?.name;
  const currentChannelMessages = messages.filter(
    (message) => message.сhannelId === currentChannelData?.id,
  );
  const currentChannelMessagesCount = currentChannelMessages.length;

  useEffect(() => {
    dispatch(fetchInitialData(getChannelsData));
    connectSocket();

    return () => {
      disconnectSocket();
    };
  }, [connectSocket, disconnectSocket, dispatch, getChannelsData]);

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <ModalWindow />
        <ChannelsPanel />
        <div className="col p-0 h-100">
          <div className="d-flex flex-column h-100">
            <ChatPanel
              currentChannelName={currentChannelName}
              currentChannelMessagesCount={currentChannelMessagesCount}
            />
            <MessageBox currentChannelMessages={currentChannelMessages} />
            <MessageForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
