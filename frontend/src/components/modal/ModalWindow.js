import { useSelector } from "react-redux";
import AddChannelModalWindow from "./AddChannelModalWindow";
import RenameChannelModalWindow from "./RenameChannelModalWindow";
import RemoveChannelModalWindow from "./RemoveChannelModalWindow";

const ModalWindow = () => {
    const currentModalWindowType = useSelector((state) => state.modalWindow.type);

    if (currentModalWindowType === 'add') {
        return (
            <AddChannelModalWindow />
        )
    } else if (currentModalWindowType === 'remove') {
        return (
            <RemoveChannelModalWindow />
        )
    } else if (currentModalWindowType === 'rename') {
        return (
            <RenameChannelModalWindow />
        )
    }
};
 
export default ModalWindow;