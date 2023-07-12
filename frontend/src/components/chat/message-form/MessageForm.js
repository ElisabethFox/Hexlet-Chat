import Form from "react-bootstrap/Form";
import { BiMessageSquareDetail } from "react-icons/bi";
import './style.css'
import {useFormik} from "formik";
import { useAuthorization, useChatApi } from "../../../hooks/hooks";

const MessageForm = () => {
    const { addNewMessage } = useChatApi();
    const { getUserName } = useAuthorization();

    const formik = useFormik({
        initialValues: { text: "", username: getUserName() },
        onSubmit: (values,  { resetForm }) => {
            try {
                addNewMessage(values);
                resetForm();
            } catch {
                console.log('error');
            }
        },
    });

    return (
        <div className="mt-auto px-5 py-3">
            <Form noValidate onSubmit={formik.handleSubmit} className="py-1 border rounded-2">
                <div className="input-group has-validation">
                    <Form.Control
                        id="text"
                        name="text"
                        aria-label="Новое сообщение"
                        className="border-0 p-1 ps-2 form-control"
                        placeholder="Введите сообщение..."
                        onChange={formik.handleChange}
                        value={formik.values.text}
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
