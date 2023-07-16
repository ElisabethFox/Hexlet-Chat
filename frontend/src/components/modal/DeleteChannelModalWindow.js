import { Modal } from "react-bootstrap";
import ModalButtton from "../buttons/modal-button/ModalButtton";
import Form from "react-bootstrap/Form";
import {useFormik} from "formik";
import { useChatApi } from "../../hooks/hooks";
import { useDispatch, useSelector } from "react-redux";
import { closeModalWindow, openModalWindow } from "../../slices/modalWindowSlice";
import { deleteChannel } from "../../slices/channelsSlice";

const DeleteChannelModalWindow = () => {
    const { addNewChannel } = useChatApi();
    const dispatch = useDispatch();
    const isModalWindowOpen = useSelector((state) => state.modalWindow.isOpen);

    const hundleDeleteChannel = () => {
        dispatch(openModalWindow());
    };

    const hundleCloseModalWindow = () => {
        dispatch(closeModalWindow());
    };

    return (
    <Modal show={isModalWindowOpen}>
        <div className="modal-header">
            <div className="modal-title h4">Удалить канал</div>
            <button type="button" className="btn-close" aria-label="Close" onClick={hundleDeleteChannel}></button>
        </div>

        <div className="modal-body">
        <p class="lead">Уверены?</p>
        <div class="d-flex justify-content-end">
                <ModalButtton title={'Отменить'} priority={false}/>
                <ModalButtton title={'Удалить'} priority={true} onClick={hundleCloseModalWindow}/>
        </div>        
        </div>
    </Modal>
    );
}
 
export default DeleteChannelModalWindow;