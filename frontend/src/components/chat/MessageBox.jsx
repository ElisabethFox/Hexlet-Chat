import Message from './Message';

const MessageBox = ({ currentChannelMessages }) => {
  return (
      <div id="messages-box" className="chat-messages overflow-auto px-5">
          {currentChannelMessages.map((message) => <Message message={message} key={message.id} />)}
      </div>
  );
};

export default MessageBox;
