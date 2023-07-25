import cn from 'classnames';

const ModalButtton = ({ title, onClick, priority = null }) => {
  const ModalButttonClasses = cn('w-40 modal-button', {
    'high-priority': priority,
  });

  return (
    <button type={priority ? 'submit' : 'button'} className={ModalButttonClasses} onClick={onClick}>{title}</button>
  );
};

export default ModalButtton;
