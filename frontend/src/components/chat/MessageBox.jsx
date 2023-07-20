import { useSelector } from "react-redux";
import Message from "./Message";
import { messagesSelector } from "../../selectors/selectors";
import { currentChannelSelector } from "../../selectors/selectors";

const MessageBox = () => {
    const messages = useSelector(messagesSelector.selectAll);
    const currentChannel = useSelector(currentChannelSelector);
    const currentChannelMessages = messages.filter((message) => message.сhannelId === currentChannel.id);

    return (
        <div id="messages-box" className="chat-messages overflow-auto px-5">
            {currentChannelMessages.map((message) => <Message message={message} key={message.id} />)}
        </div>
    );
};

export default MessageBox;
