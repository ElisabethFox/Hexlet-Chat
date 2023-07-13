import MessageForm from "../message-form/MessageForm";
import './style.css'
import MessageBox from "../messages-box/MessageBox";
import { useSelector } from "react-redux";
import {currentChannelSelector} from "../../../selectors/selectors";

const ChatPanel = () => {
    return (
        <div className="col p-0 h-100">
            <div className="d-flex flex-column h-100">
                <div className="bg-light mb-4 p-3 shadow-sm small">
                    <p className="m-0">
                        <b className="channel-name"># general</b>
                    </p>
                    <span className="message-count">0 сообщений</span>
                </div>
                <MessageBox />
                <MessageForm />
            </div>
        </div>
    )
};

export default ChatPanel;
