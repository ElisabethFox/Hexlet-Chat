import { Modal } from "react-bootstrap";
import ModalButtton from "../buttons/modal-button/ModalButtton";
import { useChatApi } from "../../hooks/hooks";
import { useDispatch, useSelector } from "react-redux";
import { closeModalWindow, openModalWindow } from "../../slices/modalWindowSlice";
import { useTranslation } from "react-i18next";

const RemoveChannelModalWindow = () => {
    const { removeSelectedChannel } = useChatApi();
    const dispatch = useDispatch();
    const isModalWindowOpen = useSelector((state) => state.modalWindow.isOpen);
    const { t } = useTranslation();

    const hundleRemoveChannel = (ChannelId) => {
        removeSelectedChannel(ChannelId);
        dispatch(closeModalWindow());
    };

    const hundleCloseModalWindow = () => {
        dispatch(closeModalWindow());
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
                <ModalButtton title={t('modal.removeBtn')} priority={true} onClick={hundleRemoveChannel}/>
        </div>        
        </div>
    </Modal>
    );
}
 
export default RemoveChannelModalWindow;