import Message from "../message/Message";
import {useSelector} from "react-redux";
import {messagesSelector} from "../../../selectors/selectors";

const MessageBox = () => {

    const messages = useSelector(messagesSelector.selectAll);
    console.log(messages)

    const mapped = messages.map((message) => {
        return (
            <Message message={message}/>
        )
    });

    return (
        <div id="messages-box" className="chat-messages overflow-auto px-5">
            {mapped}
        </div>
    )
};

export default MessageBox;
