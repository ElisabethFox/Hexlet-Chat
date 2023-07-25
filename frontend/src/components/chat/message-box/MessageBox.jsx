import Message from '../message/Message';

import './style.css';

const MessageBox = ({ currentChannelMessages }) => (
  <div id="messages-box" className="chat-messages overflow-auto px-5">
    {currentChannelMessages.map((message) => <Message message={message} key={message.id} />)}
  </div>
);

export default MessageBox;
