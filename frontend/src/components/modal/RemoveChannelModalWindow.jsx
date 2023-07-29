import { toast } from 'react-toastify';
import { useRollbar } from '@rollbar/react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Modal } from 'react-bootstrap';
import ModalButtton from '../buttons/ModalButtton';
import { useChatApi } from '../../hooks';
import { closeModalWindow, setCurrentModalType, setRelevantChannel } from '../../slices/modalWindowSlice';

const RemoveChannelModalWindow = () => {
  const { t } = useTranslation();
  const rollbar = useRollbar();
  const dispatch = useDispatch();
  const { removeSelectedChannel } = useChatApi();
  const relevantChannelId = useSelector((state) => state.modalWindow.relevantChannel);
  const isModalWindowOpen = useSelector((state) => state.modalWindow.isOpen);

  const handleRemoveChannel = (id) => {
    try {
      removeSelectedChannel(id);
      dispatch(closeModalWindow());
      toast.success(t('toast.channelRemoval'));
    } catch (error) {
      toast.error(t('toast.networkError'));
      rollbar.error('RemoveChannel', error);
    }
  };

  const handleCloseModalWindow = () => {
    dispatch(closeModalWindow());
    dispatch(setCurrentModalType(null));
    dispatch(setRelevantChannel(null));
  };

  return (
    <Modal show={isModalWindowOpen}>
      <div className="modal-header">
        <div className="modal-title h4">{t('modal.removeChannel')}</div>
        <button type="button" className="btn-close" aria-label="Close" onClick={handleCloseModalWindow} />
      </div>

      <div className="modal-body">
        <p className="lead">{t('modal.sure')}</p>
        <div className="d-flex justify-content-end">
          <ModalButtton title={t('modal.cancelBtn')} onClick={handleCloseModalWindow} />
          <button type="button" className="btn btn-danger w-40" onClick={() => handleRemoveChannel(relevantChannelId)}>
            {t('modal.removeBtn')}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default RemoveChannelModalWindow;
