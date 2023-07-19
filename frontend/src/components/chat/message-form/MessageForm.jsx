import Form from "react-bootstrap/Form";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useAuthorization, useChatApi } from "../../../hooks/hooks";
import { currentChannelSelector } from "../../../selectors/selectors";

import leoProfanity from "leo-profanity";
import { BiMessageSquareDetail } from "react-icons/bi";

const MessageForm = () => {
    const { t } = useTranslation(); 

    const { addNewMessage } = useChatApi();
    const { getUserName } = useAuthorization();
    const currentChannel = useSelector(currentChannelSelector);

    const formik = useFormik({
        initialValues: { text: "", username: getUserName() },
        onSubmit: ({ text, username }, { resetForm }) => {
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
    );
};

export default MessageForm;
