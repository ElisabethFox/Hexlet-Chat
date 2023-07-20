import Form from "react-bootstrap/Form";
import { useFormik } from "formik";
import { Modal } from "react-bootstrap";
import { useRollbar } from "@rollbar/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useChatApi } from "../../hooks/hooks";
import { closeModalWindow } from "../../slices/modalWindowSlice";
import { channelsNamesSelector } from "../../selectors/selectors";
import ModalButtton from "../buttons/ModalButtton";

import { toast } from "react-toastify";
import channelNameShema from "../../validation/channelNameShema";


const AddChannelModalWindow = () => {
    const { t } = useTranslation();
    const rollbar = useRollbar();
    const dispatch = useDispatch();
    const channelsNames = useSelector(channelsNamesSelector);
    const { addNewChannel } = useChatApi();
    const isModalWindowOpen = useSelector((state) => state.modalWindow.isOpen);
    const [isInvalidChannelName, setInvalidChannelName] = useState(false);

    const handleCloseModalWindow = () => {
        dispatch(closeModalWindow());
    };

    const formik = useFormik({
        initialValues: { name: "" },
        validationSchema: channelNameShema(channelsNames),
        onSubmit: async (values) => {
            try {
                setInvalidChannelName(false);
                await addNewChannel(values);
                handleCloseModalWindow();
                toast.success(t('toast.channelCreation'));
            } catch(error) {
                setInvalidChannelName(true);
                toast.error(t('toast.networkError'));
                rollbar.error('AddChannel', error);
            }
        } 
    });

return (
    <Modal show={isModalWindowOpen} >
        <div className="modal-header">
            <div className="modal-title h4">{t('modal.createChannel')}</div>
            <button type="button" className="btn-close" aria-label="Close" onClick={handleCloseModalWindow}></button>
        </div>

        <div className="modal-body">
            <Form onSubmit={formik.handleSubmit} className="py-1 rounded-2">
                <div className="form-group">
                <Form.Control
                    autoFocus
                    id="name"
                    type="text"
                    name="name"
                    aria-label={t('modal.newChannelName')}
                    className="p-2 ps-2 form-control"
                    placeholder={t('modal.channelNameInput')}
                    onChange={formik.handleChange}
                    isInvalid={(formik.errors.name && formik.touched.name) || isInvalidChannelName}
                    disabled={formik.isSubmitting}
                />
                <Form.Label htmlFor="name" className="form-label visually-hidden">
                    Канал
                </Form.Label>
                <Form.Control.Feedback type="invalid" className="invalid-feedback">
                    От 3 до 20 символов
                </Form.Control.Feedback>
                </div>

                <div class="d-flex justify-content-end">
                <ModalButtton title={t('modal.cancelBtn')} priority={false} onClick={handleCloseModalWindow}/>
                <ModalButtton title={t('modal.sendBtn')} priority={true} onClick={formik.handleSubmit}/>
                </div>
            </Form>
        </div>
    </Modal>
);
};
 
export default AddChannelModalWindow;