import { Modal } from "react-bootstrap";
import ModalButtton from "../buttons/modal-button/ModalButtton";
import Form from "react-bootstrap/Form";
import {useFormik} from "formik";
import { useChatApi } from "../../hooks/hooks";
import { useDispatch, useSelector } from "react-redux";
import { closeModalWindow } from "../../slices/modalWindowSlice";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import channelNameShema from "../../validation/channelNameShema";
import { useState } from "react";


const AddChannelModalWindow = () => {
    const { addNewChannel } = useChatApi();
    const isModalWindowOpen = useSelector((state) => state.modalWindow.isOpen);
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const [isInvalid, setInvalid] = useState(false);

    
    const hundleCloseModalWindow = () => {
        dispatch(closeModalWindow());
    };

    const formik = useFormik({
        initialValues: { name: "" },
        validationSchema: channelNameShema,
        onSubmit: async (values) => {
            try {
                setInvalid(false);

                const channel = {
                    ...values,
                }

                await addNewChannel(channel);
                hundleCloseModalWindow();
                toast.success(t('toast.channelCreation'));
            } catch {
                setInvalid(true);
                console.log('error');
                toast.error(t('toast.networkError'));
            }
        },
    });

    return (
        <Modal show={isModalWindowOpen} centered >
                <div className="modal-header">
                    <div className="modal-title h4">{t('modal.createChannel')}</div>
                    <button type="button" className="btn-close" aria-label="Close" onClick={hundleCloseModalWindow}></button>
                </div>

                <div className="modal-body">
                    <Form onSubmit={formik.handleSubmit} className="py-1 rounded-2">
                        <div className="form-group">
                        <Form.Control
                        id="name"
                        name="name"
                        aria-label={t('modal.newChannelName')}
                        className="p-1 ps-2 form-control"
                        placeholder={t('modal.channelNameInput')}
                        onChange={formik.handleChange}
                        value={formik.values.channelName}
                        isInvalid={isInvalid}
                        />
                        </div>
                        <Form.Control.Feedback type="invalid" className="invalid-tooltip invalid-feedback"
                                           for="name" tooltip={isInvalid}>
                        {t('login.loginError')}
                        </Form.Control.Feedback>
                        <div class="d-flex justify-content-end">
                        <ModalButtton title={t('modal.cancelBtn')} priority={false} onClick={hundleCloseModalWindow}/>
                        <ModalButtton title={t('modal.sendBtn')} priority={true} onClick={formik.handleSubmit}/>
                        </div>
                    </Form>
                </div>
        </Modal>
    );
}
 
export default AddChannelModalWindow;