import { Modal } from "react-bootstrap";
import ModalButtton from "../buttons/modal-button/ModalButtton";
import Form from "react-bootstrap/Form";
import {useFormik} from "formik";
import { useChatApi } from "../../hooks/hooks";
import { useDispatch, useSelector } from "react-redux";
import { closeModalWindow } from "../../slices/modalWindowSlice";
import { useTranslation } from "react-i18next";

const RenameChannelModalWindow = () => {
    const { renameChannel } = useChatApi();
    const isModalWindowOpen = useSelector((state) => state.modalWindow.isOpen);
    const dispatch = useDispatch();
    const { t } = useTranslation();

    
    const hundleCloseModalWindow = () => {
        dispatch(closeModalWindow());
    };

    const formik = useFormik({
        initialValues: { newName: "" },
        onSubmit: (values) => {
            try {
                const channel = {
                    ...values,
                }
                renameChannel(channel);
                hundleCloseModalWindow();
            } catch {
                console.log('error');
            }
        },
    });

    return (
        <Modal show={isModalWindowOpen} centered >
                <div className="modal-header">
                    <div className="modal-title h4">{t('modal.renameChannel')}</div>
                    <button type="button" className="btn-close" aria-label="Close" onClick={hundleCloseModalWindow}></button>
                </div>

                <div className="modal-body">
                    <Form noValidate onSubmit={formik.handleSubmit} className="py-1 rounded-2">
                        <div className="form-group">
                        <Form.Control
                        id="name"
                        name="name"
                        aria-label={t('modal.newChannelName')}
                        className="p-1 ps-2 form-control"
                        placeholder={t('modal.channelNameInput')}
                        onChange={formik.handleChange}
                        value={formik.values.channelName}
                        />
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
 
export default RenameChannelModalWindow;