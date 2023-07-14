import { Modal } from "react-bootstrap";
import ModalButtton from "../buttons/modal-button/ModalButtton";
import Form from "react-bootstrap/Form";
import {useFormik} from "formik";
import {addNewChannel} from '../../context/ChatContext'
import { useChatApi } from "../../hooks/hooks";

const ModalWindow = ({ isOpen }) => {
    const { addNewChannel } = useChatApi();
    
    const formik = useFormik({
        initialValues: { channelName: "" },
        onSubmit: (values,  { resetForm }) => {
            try {
                const channel = {
                    ...values,
                }
                addNewChannel(channel);
                resetForm();
            } catch {
                console.log('error');
            }
        },
    });


    return (
        <Modal show={isOpen}>
                <div className="modal-header">
                    <div className="modal-title h4">Добавить канал</div>
                    <button type="button" className="btn-close" aria-label="Close"></button>
                </div>

                <div className="modal-body">
                    <form>
                        <div className="form-group">
                        <input className="form-control" data-testid="input-body" name="body" required="" value="" />
                        </div>
                        <ModalButtton title={'Отменить'} priority={false} />
                        <ModalButtton title={'Отправить'} priority={true} />
                    </form>
                </div>
        </Modal>
    );
}
 
export default ModalWindow;