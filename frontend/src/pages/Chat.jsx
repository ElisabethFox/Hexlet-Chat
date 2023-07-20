import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useChatApi } from "../hooks/hooks";
import fetchInitialData from "../context/InitialDataThunk";
import { messagesSelector } from "../selectors/selectors";
import { currentChannelSelector } from "../selectors/selectors";
import ChannelsPanel from "../components/chat/channels-panel/ChannelsPanel";
import ChatPanel from "../components/chat/chat-panel/ChatPanel";
import ModalWindow from "../components/modal/ModalWindow";
import MessageBox from "../components/chat/MessageBox";
import MessageForm from "../components/chat/MessageForm";

const Chat = () => {
    const dispatch = useDispatch();
    const { connectSocket, disconnectSocket, getChannelsData } = useChatApi();
    const messages = useSelector(messagesSelector.selectAll);
    const currentChannel = useSelector(currentChannelSelector);
    const currentChannelName = currentChannel?.name;
    const currentChannelMessages = messages.filter((message) => message.сhannelId === currentChannel?.id);
    const currentChannelMessagesCount = currentChannelMessages.length;


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
                <ModalWindow />
                <ChannelsPanel />
            <div className="col p-0 h-100">
            <div className="d-flex flex-column h-100">
                <ChatPanel currentChannelName={currentChannelName} currentChannelMessagesCount={currentChannelMessagesCount} />
                <MessageBox currentChannelMessages={currentChannelMessages} />
                <MessageForm />
            </div>
            </div>
            </div>
        </div>

    );
}

export default Chat;
