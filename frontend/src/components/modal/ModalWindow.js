import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import AddChannelModalWindow from "./AddChannelModalWindow";
import { setCurrentModalType } from "../../slices/modalWindowSlice";
import { useDispatch } from "react-redux";
import { openModalWindow } from "../../slices/modalWindowSlice";
import RenameChannelModalWindow from "./RenameChannelModalWindow";

const ModalWindow = () => {
    const isModalWindowOpen = useSelector((state) => state.modalWindow.isOpen);

    
    return (
        <Modal show={isModalWindowOpen} centered >
            <RenameChannelModalWindow />
        </Modal>
    );
}
 
export default ModalWindow;