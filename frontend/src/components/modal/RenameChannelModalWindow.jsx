import { toast } from 'react-toastify';
import Form from 'react-bootstrap/Form';
import { useFormik } from 'formik';
import { useRef, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { useRollbar } from '@rollbar/react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useChatApi } from '../../hooks';
import { channelsSelector, channelsNames } from '../../selectors';
import { closeModalWindow, setCurrentModalType, setRelevantChannel } from '../../slices/modalWindowSlice';
import ModalButtton from '../buttons/ModalButtton';
import channelNameSсhema from '../../validation/channelNameSсhema';

const RenameChannelModalWindow = () => {
  const { t } = useTranslation();
  const rollbar = useRollbar();
  const dispatch = useDispatch();
  const { renameSelectedChannel } = useChatApi();
  const channelsNamesList = useSelector(channelsNames);
  const isModalWindowOpen = useSelector((state) => state.modalWindow.isOpen);
  const relevantChannelId = useSelector((state) => state.modalWindow.relevantChannel);
  const channels = useSelector(channelsSelector.selectAll);
  const relevantChannelName = channels.find(({ id }) => id === relevantChannelId).name;
  const refModalInput = useRef(null);

  useEffect(() => {
    refModalInput?.current?.focus();
  }, []);

  console.log(refModalInput)
  const handleCloseModalWindow = () => {
    dispatch(closeModalWindow());
    dispatch(setCurrentModalType(null));
    dispatch(setRelevantChannel(null));
  };

  const formik = useFormik({
    initialValues: { name: relevantChannelName },
    validationSchema: channelNameSсhema(channelsNamesList, t('modal.channelNameLength'), t('modal.requaredField'), t('modal.uniqueNameError')),
    onSubmit: async (values) => {
      const { name } = values;
      try {
        await renameSelectedChannel({ id: relevantChannelId, name });
        handleCloseModalWindow();
        toast.success(t('toast.channelRenaming'));
      } catch (error) {
        toast.error(t('toast.networkError'));
        rollbar.error('RemoveChannel', error);
      }
    },
  });

  return (
    <Modal show={isModalWindowOpen}>
      <div className="modal-header">
        <div className="modal-title h4">{t('modal.renameChannel')}</div>
        <button type="button" className="btn-close" aria-label="Close" onClick={handleCloseModalWindow} />
      </div>

      <div className="modal-body">
        <Form onSubmit={formik.handleSubmit} className="py-1 rounded-2">
          <div className="form-group">
            <Form.Control
              ref={refModalInput}
              id="name"
              type="text"
              name="name"
              aria-label={t('modal.channelNameInput')}
              className="p-2 ps-2 form-control"
              placeholder={t('modal.channelNameInput')}
              onChange={formik.handleChange}
              isInvalid={(formik.errors.name && formik.touched.name)}
              value={formik.values.name}
            />
            <Form.Label htmlFor="name" className="form-label visually-hidden">
              {t('modal.channelNameInput')}
            </Form.Label>
            <Form.Control.Feedback type="invalid" className="invalid-feedback">
              {formik.errors.name}
            </Form.Control.Feedback>
          </div>

          <div className="d-flex justify-content-end">
            <ModalButtton title={t('modal.cancelBtn')} onClick={handleCloseModalWindow} />
            <ModalButtton title={t('modal.sendBtn')} onClick={formik.handleSubmit} priority />
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default RenameChannelModalWindow;
