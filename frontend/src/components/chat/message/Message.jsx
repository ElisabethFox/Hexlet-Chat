import cn from 'classnames';
import { useAuthorization } from '../../../hooks';
import './style.css';

const Message = ({ message }) => {
  const { getUserName } = useAuthorization();
  const { username, text } = message;

  const messageClasses = cn('text-break mb-2 message', {
    'another-user-message': (getUserName() !== message.username),
  });

  return (
    <div className={messageClasses}>
      <b>{username}</b>
      :
      {' '}
      {text}
    </div>
  );
};

export default Message;
