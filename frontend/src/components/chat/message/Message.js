const Message = ({ userName, message}) => {
    return (
        <div className="text-break mb-2">
            <b>{userName}</b>
            :
            {message}
        </div>
    )
};

export default Message;
