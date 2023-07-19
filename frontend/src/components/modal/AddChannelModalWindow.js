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
import { channelsNamesSelector } from "../../selectors/selectors";


const AddChannelModalWindow = () => {
    const { addNewChannel } = useChatApi();
    const isModalWindowOpen = useSelector((state) => state.modalWindow.isOpen);
    const channelsNames = useSelector(channelsNamesSelector)
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const [isInvalidChannelName, setInvalidChannelName] = useState(false);

    
    const hundleCloseModalWindow = () => {
        dispatch(closeModalWindow());
    };

    const formik = useFormik({
        initialValues: { name: "" },
        validationSchema: channelNameShema(channelsNames),
        onSubmit: async (values) => {
            try {
                setInvalidChannelName(false);
                await addNewChannel(values);
                hundleCloseModalWindow();
                toast.success(t('toast.channelCreation'));
            } catch(error) {
                console.log(error)
                setInvalidChannelName(true);
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
                        type="text"
                        name="name"
                        aria-label={t('modal.newChannelName')}
                        className="p-1 ps-2 form-control"
                        placeholder={t('modal.channelNameInput')}
                        onChange={formik.handleChange}
                        isInvalid={(formik.errors.name && formik.touched.name) || isInvalidChannelName}
                        />
                        <Form.Label htmlFor="name" className="form-label visually-hidden">
                        {t('login.password')}
                        </Form.Label>
                        <Form.Control.Feedback type="invalid" className="invalid-feedback">
                        От 3 до 20 символов
                        </Form.Control.Feedback>
                        </div>

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