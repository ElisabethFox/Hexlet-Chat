const Message = ({ message }) => {
    return (
        <div className="text-break mb-2">
            <b>{message.username}</b>
            : {message.text}
        </div>
    );
};

export default Message;
