import { Modal } from "react-bootstrap";
import ModalButtton from "../buttons/modal-button/ModalButtton";
import Form from "react-bootstrap/Form";
import {useFormik} from "formik";
import { useChatApi } from "../../hooks/hooks";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { closeModalWindow, setCurrentModalType, setRelevantChannel } from "../../slices/modalWindowSlice";
import { channelsSelector } from "../../selectors/selectors";
import { toast } from "react-toastify";



const RenameChannelModalWindow = () => {
    const { renameChannel } = useChatApi();
    const isModalWindowOpen = useSelector((state) => state.modalWindow.isOpen);
    const relevantChannelId = useSelector((state) => state.modalWindow.relevantChannel);
    const dispatch = useDispatch();
    const { t } = useTranslation();

    
    const hundleCloseModalWindow = () => {
        dispatch(closeModalWindow());
        dispatch(setCurrentModalType(null));
        dispatch(setRelevantChannel(null));
    };

    const formik = useFormik({
        initialValues: { name: "" },
        onSubmit: (values) => {
            try {
                renameChannel({ id: relevantChannelId, name: values.name });
                hundleCloseModalWindow();
                toast.success(t('toast.channelRenaming'));
            } catch {
                console.log('error');
                toast.error(t('toast.networkError'));
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