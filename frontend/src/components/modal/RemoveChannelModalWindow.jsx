import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Modal } from "react-bootstrap";
import ModalButtton from "../buttons/ModalButtton";
import { useChatApi } from "../../hooks/hooks";
import { closeModalWindow, setCurrentModalType, setRelevantChannel } from "../../slices/modalWindowSlice";

import { toast } from "react-toastify";

const RemoveChannelModalWindow = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { removeSelectedChannel } = useChatApi();

    const isModalWindowOpen = useSelector((state) => state.modalWindow.isOpen);
    const relevantChannelId = useSelector((state) => state.modalWindow.relevantChannel);

    const handleRemoveChannel = (id) => {
        try {
            removeSelectedChannel(id);
            dispatch(closeModalWindow());
            toast.success(t('toast.channelRemoval'));
        } catch {
            toast.error(t('toast.networkError'));
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
                <button type="button" className="btn-close" aria-label="Close" onClick={handleCloseModalWindow}></button>
            </div>

            <div className="modal-body">
            <p class="lead">{t('modal.sure')}</p>
            <div class="d-flex justify-content-end">
                    <ModalButtton title={t('modal.cancelBtn')} priority={false} onClick={handleCloseModalWindow}/>
                    <ModalButtton title={t('modal.removeBtn')} priority={true} onClick={() => handleRemoveChannel(relevantChannelId)}/>
            </div>        
            </div>
        </Modal>
    );
};
 
export default RemoveChannelModalWindow;