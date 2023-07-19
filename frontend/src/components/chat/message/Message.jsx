const Message = ({ message, key }) => {
    return (
        <div className="text-break mb-2" key={key}>
            <b>{message.username}</b>
            : {message.text}
        </div>
    );
};

export default Message;
