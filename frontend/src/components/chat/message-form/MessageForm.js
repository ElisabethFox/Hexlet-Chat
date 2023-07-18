import Form from "react-bootstrap/Form";
import { BiMessageSquareDetail } from "react-icons/bi";
import './style.css'
import {useFormik} from "formik";
import { useAuthorization, useChatApi } from "../../../hooks/hooks";
import { useSelector } from "react-redux";
import {currentChannelSelector} from "../../../selectors/selectors"
import { useTranslation } from "react-i18next";
import leoProfanity from 'leo-profanity';

const MessageForm = () => {
    const { addNewMessage } = useChatApi();
    const { getUserName } = useAuthorization();
    const currentChannel = useSelector(currentChannelSelector);
    const { t } = useTranslation(); 

    const formik = useFormik({
        initialValues: { text: "", username: getUserName() },
        onSubmit: ({ text, username },  { resetForm }) => {
            try {
                const message = {
                    username,
                    text: leoProfanity.clean(text),
                    сhannelId: currentChannel.id,
                }
                addNewMessage(message);
                resetForm();
            } catch {
                console.log('error');
            }
        },
    });

    return (
        <div className="mt-auto px-5 py-3">
            <Form noValidate onSubmit={formik.handleSubmit} className="py-1 rounded-2">
                <div className="input-group has-validation">
                    <Form.Control
                        id="text"
                        name="text"
                        aria-label={t('message.newMessage')}
                        className="p-2 ps-2 form-control"
                        placeholder={t('message.messageInput')}
                        onChange={formik.handleChange}
                        value={formik.values.text}
                    />
                <button type="button" className="p-0 m-2 btn border-0 position-absolute end-0 me-2 add-button">
                    <BiMessageSquareDetail className="add-icon"/>
                    <span className="visually-hidden">{t('message.sendMessage')}</span>
                </button>
                </div>
            </Form>
        </div>
    )
};

export default MessageForm;
