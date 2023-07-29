import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { useRollbar } from '@rollbar/react';
import { useAuthorization, useChatApi } from '../hooks';
import fetchInitialData from '../context/InitialDataThunk';
import { messagesSelector, currentChannel } from '../selectors/selectors';
import ChannelsPanel from '../components/chat/channels-panel/ChannelsPanel';
import ChatPanel from '../components/chat/chat-panel/ChatPanel';
import ModalWindow from '../components/modal/ModalWindow';
import MessageBox from '../components/chat/message-box/MessageBox';
import MessageForm from '../components/chat/MessageForm';

const Chat = () => {
  const { t } = useTranslation();
  const rollbar = useRollbar();
  const dispatch = useDispatch();
  const { connectSocket, disconnectSocket, getServerData } = useChatApi();
  const { logOut } = useAuthorization();
  const messages = useSelector(messagesSelector.selectAll);
  const currentChannelData = useSelector(currentChannel);
  const currentChannelName = currentChannelData?.name;
  const currentChannelMessages = messages.filter(
    (message) => message.сhannelId === currentChannelData?.id,
  );
  const currentChannelMessagesCount = currentChannelMessages.length;
  const loadingStatus = useSelector((state) => state?.loading?.serverData);

  useEffect(() => {
    dispatch(fetchInitialData(getServerData));
    connectSocket();

    return () => {
      disconnectSocket();
    };
  }, [connectSocket, disconnectSocket, dispatch, getServerData]);

  useEffect(() => {
    if (loadingStatus === 'failed') {
      logOut();
      toast.error(t('toast.networkError'));
      rollbar.error('ChatFailed');
    }

    if (loadingStatus === 'authError') {
      logOut();
      toast.error(t('toast.authError'));
      rollbar.error('AuthFailed');
    }
  }, [loadingStatus, logOut, rollbar, t]);

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
