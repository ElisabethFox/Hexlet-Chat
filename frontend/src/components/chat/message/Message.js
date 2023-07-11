const Message = ({ message }) => {
    return (
        <div className="text-break mb-2" key={message.id}>
            <b>{message.username}</b>
            :
            {message.text}
        </div>
    )
};

export default Message;
