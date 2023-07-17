import { useEffect } from "react";
import { useChatApi } from "../hooks/hooks";
import fetchInitialData from "../context/InitialDataThunk";
import { useDispatch, useSelector } from "react-redux";
import ChannelsPanel from "../components/chat/channels-panel/ChannelsPanel";
import ChatPanel from "../components/chat/chat-panel/ChatPanel";
import AddChannelModalWindow from "../components/modal/AddChannelModalWindow";
import DeleteChannelModalWindow from "../components/modal/DeleteChannelModalWindow";


const Chat = () => {
    const { connectSocket, disconnectSocket, getChannelsData } = useChatApi();
    const dispatch = useDispatch();
    // const isModalWindowOpen = useSelector((state) => state.modalWindow.isOpen);

    useEffect(() => {
        dispatch(fetchInitialData(getChannelsData));
        connectSocket();

        return () => {
            disconnectSocket();
          };

    }, [connectSocket, disconnectSocket, dispatch, getChannelsData]);

    return (
        <div className="container h-100 my-4 overflow-hidden rounded shadow">
            <div className="row h-100 bg-white flex-md-row">
                <AddChannelModalWindow />
                {/* <DeleteChannelModalWindow /> */}
                <ChannelsPanel />
                <ChatPanel />
            </div>
        </div>
    );
}

export default Chat;
