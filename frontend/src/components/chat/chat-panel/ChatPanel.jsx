import { useTranslation } from "react-i18next";
import MessageForm from "../MessageForm";
import MessageBox from "../MessageBox";

import "./style.css";

const ChatPanel = () => {
    const { t } = useTranslation();

    return (
        <div className="col p-0 h-100">
            <div className="d-flex flex-column h-100">
                <div className="bg-light mb-4 p-3 shadow-sm small">
                    <p className="m-0">
                        <b className="channel-name"># general</b>
                    </p>
                    <span className="message-count">0 {t('message.messagesCount')}</span>
                </div>
                <MessageBox />
                <MessageForm />
            </div>
        </div>
    );
};

export default ChatPanel;
