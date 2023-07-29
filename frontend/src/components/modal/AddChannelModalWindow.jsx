import { toast } from 'react-toastify';
import Form from 'react-bootstrap/Form';
import { useFormik } from 'formik';
import { Modal } from 'react-bootstrap';
import { useRollbar } from '@rollbar/react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useChatApi } from '../../hooks';
import { closeModalWindow, setCurrentModalType } from '../../slices/modalWindowSlice';
import { channelsNames } from '../../selectors/selectors';
import ModalButtton from '../buttons/ModalButtton';
import channelNameSсhema from '../../validation/channelNameSсhema';

const AddChannelModalWindow = () => {
  const { t } = useTranslation();
  const rollbar = useRollbar();
  const dispatch = useDispatch();
  const channelsNamesList = useSelector(channelsNames);
  const { addNewChannel } = useChatApi();
  const isModalWindowOpen = useSelector((state) => state.modalWindow.isOpen);

  const handleCloseModalWindow = () => {
    dispatch(closeModalWindow());
    dispatch(setCurrentModalType(null));
  };

  const formik = useFormik({
    initialValues: { name: '' },
    validationSchema: channelNameSсhema(channelsNamesList, t('modal.channelNameLength'), t('modal.requaredField'), t('modal.uniqueNameError')),
    onSubmit: async (values) => {
      try {
        await addNewChannel(values);
        handleCloseModalWindow();
        toast.success(t('toast.channelCreation'));
      } catch (error) {
        toast.error(t('toast.networkError'));
        rollbar.error('AddChannel', error);
      }
    },
  });

  return (
    <Modal show={isModalWindowOpen}>
      <div className="modal-header">
        <div className="modal-title h4">{t('modal.createChannel')}</div>
        <button type="button" className="btn-close" aria-label="Close" onClick={handleCloseModalWindow} />
      </div>

      <div className="modal-body">
        <Form onSubmit={formik.handleSubmit} className="py-1 rounded-2">
          <div className="form-group">
            <Form.Control
              autoFocus
              id="name"
              type="text"
              name="name"
              aria-label={t('modal.channelNameInput')}
              className="p-2 ps-2 form-control"
              onChange={formik.handleChange}
              isInvalid={(formik.errors.name && formik.touched.name)}
              disabled={formik.isSubmitting}
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

export default AddChannelModalWindow;
