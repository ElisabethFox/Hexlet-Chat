import Message from "../message/Message";
import {useContext} from "react";
import {SocketContext} from "../../../context/SocketContext";


const MessageBox = () => {
    const { messages } = useContext(SocketContext);
    console.log(messages)
    const mapped = messages.map((message) => {
        return (
            <Message userName={message.username} message={message.message} key={1}/>
        )
    });

    return (
        <div id="messages-box" className="chat-messages overflow-auto px-5">
            {mapped}
        </div>
    )
};

export default MessageBox;
