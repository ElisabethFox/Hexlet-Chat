import { useEffect } from "react";
import ChatCard from "../components/chat/chat-card/ChatCard";
import { useChatApi } from "../hooks/hooks";

const Chat = () => {
    const { connectSocket, disconnectSocket, addNewChannel, getChannelsData } = useChatApi();


    useEffect(() => {
        connectSocket()
        getChannelsData()
    }, []);

    return (
        <div className="container h-100 my-4 overflow-hidden rounded shadow">
            <ChatCard />
        </div>
    );
}

export default Chat;
