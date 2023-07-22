import './style.css'

const Message = ({ message }) => {
  const { username, text } = message;

  return (
    <div className="text-break mb-2 message">
      <b>{username}</b>
      :
      {' '}
      {text}
    </div>
  );
};

export default Message;
