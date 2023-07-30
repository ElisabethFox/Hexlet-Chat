import leoProfanity from 'leo-profanity';
import { BiMessageSquareDetail } from 'react-icons/bi';
import Form from 'react-bootstrap/Form';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useRollbar } from '@rollbar/react';
import { toast } from 'react-toastify';
import { useEffect, useRef } from 'react';
import { useAuthorization, useChatApi } from '../../hooks';
import { currentChannel } from '../../selectors';
import messageSchema from '../../validation/messageSchema';

const MessageForm = () => {
  const { t } = useTranslation();
  const rollbar = useRollbar();
  const { addNewMessage } = useChatApi();
  const { getUserName } = useAuthorization();
  const currentChannelData = useSelector(currentChannel);
  const refInput = useRef(null);

  useEffect(() => {
    refInput?.current?.focus();
  }, [currentChannelData]);

  const formik = useFormik({
    initialValues: { text: '', username: getUserName() },
    validationSchema: messageSchema(t('message.requaredField')),
    onSubmit: async ({ text, username }) => {
      try {
        const message = {
          username,
          text: leoProfanity.clean(text),
          сhannelId: currentChannelData?.id,
        };
        await addNewMessage(message);
        formik.resetForm();
        refInput?.current?.focus();
      } catch (error) {
        toast.error(t('toast.networkError'));
        rollbar.error('MessageSending', error);
      }
    },
  });

  return (
    <div className="mt-auto px-5 py-3">
      <Form onSubmit={formik.handleSubmit} className="py-1 rounded-2">
        <div className="input-group has-validation">
          <Form.Control
            ref={refInput}
            id="text"
            name="text"
            aria-label={t('message.newMessage')}
            className="p-2 ps-2 form-control"
            placeholder={t('message.messageInput')}
            onChange={formik.handleChange}
            value={formik.values.text}
          />
          <button
            type="submit"
            style={{ zIndex: 10 }}
            disabled={formik.isSubmitting}
            className="p-0 m-2 btn border-0 position-absolute end-0 me-2 add-button"
          >
            <BiMessageSquareDetail className="add-icon" />
            <span className="visually-hidden">{t('message.sendMessage')}</span>
          </button>
        </div>
      </Form>
    </div>
  );
};

export default MessageForm;
