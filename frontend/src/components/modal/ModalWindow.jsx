import { useSelector } from 'react-redux';
import AddChannelModalWindow from './AddChannelModalWindow';
import RenameChannelModalWindow from './RenameChannelModalWindow';
import RemoveChannelModalWindow from './RemoveChannelModalWindow';

const ModalWindow = () => {
  const currentModalWindowType = useSelector((state) => state.modalWindow.type);

  if (currentModalWindowType === 'add') {
    return <AddChannelModalWindow />;
  }

  if (currentModalWindowType === 'remove') {
    return <RemoveChannelModalWindow />;
  }

  if (currentModalWindowType === 'rename') {
    return <RenameChannelModalWindow />;
  }

  return null;
};

export default ModalWindow;
