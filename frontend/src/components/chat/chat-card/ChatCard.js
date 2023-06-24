import ChannelsPanel from "../channels-panel/ChannelsPanel";
import ChatPanel from "../chat-panel/ChatPanel";


const ChatCard = () => {
    return (
        <div className="row h-100 bg-white flex-md-row">
            <ChannelsPanel />
            <ChatPanel />
        </div>
    )
};

export default ChatCard;
