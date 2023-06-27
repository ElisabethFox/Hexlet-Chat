import Message from "../message/Message";

const MessageBox = () => {
    return (
        <div id="messages-box" className="chat-messages overflow-auto px-5">
            <Message userName={1} message={11}/>
        </div>
    )
};

export default MessageBox;
