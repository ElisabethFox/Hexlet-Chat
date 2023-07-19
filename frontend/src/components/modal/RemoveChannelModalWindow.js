import { Modal } from "react-bootstrap";
import ModalButtton from "../buttons/ModalButtton";
import { useChatApi } from "../../hooks/hooks";
import { useDispatch, useSelector } from "react-redux";
import { closeModalWindow, setCurrentModalType, setRelevantChannel } from "../../slices/modalWindowSlice";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

const RemoveChannelModalWindow = () => {
    const { removeSelectedChannel } = useChatApi();
    const dispatch = useDispatch();
    const isModalWindowOpen = useSelector((state) => state.modalWindow.isOpen);
    const relevantChannelId = useSelector((state) => state.modalWindow.relevantChannel);
    const { t } = useTranslation();

    const hundleRemoveChannel = (id) => {
        try {
            removeSelectedChannel(id);
            dispatch(closeModalWindow());
            toast.success(t('toast.channelRemoval'));
        } catch {
            toast.error(t('toast.networkError'));
        }
    };

    const hundleCloseModalWindow = () => {
        dispatch(closeModalWindow());
        dispatch(setCurrentModalType(null));
        dispatch(setRelevantChannel(null));
    };

    return (
    <Modal show={isModalWindowOpen}>
        <div className="modal-header">
            <div className="modal-title h4">{t('modal.removeChannel')}</div>
            <button type="button" className="btn-close" aria-label="Close" onClick={hundleCloseModalWindow}></button>
        </div>

        <div className="modal-body">
        <p class="lead">{t('modal.sure')}</p>
        <div class="d-flex justify-content-end">
                <ModalButtton title={t('modal.cancelBtn')} priority={false} onClick={hundleCloseModalWindow}/>
                <ModalButtton title={t('modal.removeBtn')} priority={true} onClick={() => hundleRemoveChannel(relevantChannelId)}/>
        </div>        
        </div>
    </Modal>
    );
}
 
export default RemoveChannelModalWindow;