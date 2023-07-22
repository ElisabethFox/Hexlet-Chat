const Message = ({ message }) => {
  const { username, text } = message;

  return (
    <div className="text-break mb-2">
      <b>{username}</b>
      :
      {' '}
      {text}
    </div>
  );
};

export default Message;
