import Message from "../message/Message";
import {useSelector} from "react-redux";
import {messagesSelector} from "../../../selectors/selectors";
import { currentChannelSelector } from "../../../selectors/selectors";


const MessageBox = () => {
    const currentChannel = useSelector(currentChannelSelector);
    const messages = useSelector(messagesSelector.selectAll);
    const currentChannelMessages = messages.filter((message) => message.сhannelId === currentChannel.id ?? null);

    return (
        <div id="messages-box" className="chat-messages overflow-auto px-5">
            {currentChannelMessages.map((message) => <Message message={message} key={message.id} />)}
        </div>
    )
};

export default MessageBox;
