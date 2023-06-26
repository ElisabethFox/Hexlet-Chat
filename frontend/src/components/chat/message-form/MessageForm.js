import Form from "react-bootstrap/Form";
import { BiMessageSquareDetail } from "react-icons/bi";
import './style.css'

const MessageForm = () => {
    return (
        <div className="mt-auto px-5 py-3">
            <Form noValidate className="py-1 border rounded-2">
                <div className="input-group has-validation">
                    <Form.Control
                        id="message"
                        type="text"
                        name="body"
                        aria-label="Новое сообщение"
                        className="border-0 p-1 ps-2 form-control"
                        placeholder="Введите сообщение..."
                    />
                <button type="button" className="p-0 btn btn-group-vertical add-message-button">
                    <BiMessageSquareDetail className="add-message"/>
                    <span className="visually-hidden">Отправить</span>
                </button>
                </div>
            </Form>
        </div>
    )
};

export default MessageForm;
