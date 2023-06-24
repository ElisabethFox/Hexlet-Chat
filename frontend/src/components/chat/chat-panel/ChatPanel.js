import MessageForm from "../message-form/MessageForm";

const ChatPanel = () => {
    return (
        <div className="col p-0 h-100">
            <div className="d-flex flex-column h-100">
                <div className="bg-light mb-4 p-3 shadow-sm small">
                    <p className="m-0">
                        <b># general</b>
                    </p>
                    <span className="text-muted">0 сообщений</span>
                </div>
                <div id="messages-box" className="chat-messages overflow-auto px-5 "></div>
                <MessageForm />
            </div>
        </div>
    )
};

export default ChatPanel;
