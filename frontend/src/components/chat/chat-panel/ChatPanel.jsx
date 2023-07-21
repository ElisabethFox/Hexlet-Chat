import { useTranslation } from 'react-i18next';

import './style.css';

const ChatPanel = ({ currentChannelName, currentChannelMessagesCount }) => {
  const { t } = useTranslation();

  return (
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <p className="m-0">
          <b className="channel-name">
            {t('channel.prefix')} 
            {currentChannelName}
          </b>
      </p>
      <span className="message-count">
        {t('message.messagesCount', { count: currentChannelMessagesCount })}
      </span>
    </div>
  );
};

export default ChatPanel;
