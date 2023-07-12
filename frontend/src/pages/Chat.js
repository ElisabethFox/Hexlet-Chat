import { useEffect } from "react";
import ChatCard from "../components/chat/chat-card/ChatCard";
import { useChatApi } from "../hooks/hooks";
import fetchInitialData from "../context/InitialDataThunk";
import { useDispatch } from "react-redux";

const Chat = () => {
    const { connectSocket, disconnectSocket, getChannelsData } = useChatApi();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchInitialData(getChannelsData));
        connectSocket();

        return () => {
            disconnectSocket();
          };

    }, [connectSocket, disconnectSocket, dispatch, getChannelsData]);

    return (
        <div className="container h-100 my-4 overflow-hidden rounded shadow">
            <ChatCard />
        </div>
    );
}

export default Chat;
