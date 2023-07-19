import {createContext} from "react";
import {useDispatch} from "react-redux";
import {addMessage} from '../slices/messagesSlice'
import {addChannel, setCurrentChannel, removeChannel, renameChannel} from "../slices/channelsSlice";
import axios from "axios";
import { useAuthorization } from "../hooks/hooks";

export const ChatContext = createContext({});

const ChatContextProvider = ({ socket, children }) => {
    const { getUserToken } = useAuthorization();

    const dispatch = useDispatch();
    const timeout = 4000;

    const connectSocket = () => {
        socket.connect();

        socket.on('newMessage', (message) => {
            dispatch(addMessage(message));
        });
        socket.on('newChannel', (channel) => {
            dispatch(addChannel(channel));
        });
        socket.on('removeChannel', ({ id }) => {
            dispatch(removeChannel(id));
        });
        socket.on('renameChannel', ({ id, name } ) => {
            dispatch(renameChannel({ id, changes: name }));
        });
    };

    const disconnectSocket = () => {
        socket.off();
        socket.disconnect();
    };

    const addNewMessage = async (message) => {
        await socket
                .timeout(timeout)
                .emit('newMessage', { ...message });
    };
    
    const addNewChannel = async (channel) => {
        const { data } = await socket
                                .timeout(timeout)
                                .emitWithAck('newChannel', { ...channel }); 
    
console.log(data)
        dispatch(addChannel(data));
        dispatch(setCurrentChannel(data.id));
    }; 

    const removeSelectedChannel = async (id) => {
        await socket
                .timeout(timeout)
                .emit('removeChannel', { id });
    };

    const renameSelectedChannel = async (id, name) => {
        await socket
                .timeout(timeout)
                .emit('renameChannel', { id, name });
    };

    const getChannelsData = async () => {
        const response = await axios.get('/api/v1/data', {headers: {Authorization: `Bearer ${getUserToken()}`}})
        return response;
    };

    return (
        <ChatContext.Provider value={{ connectSocket, disconnectSocket, addNewMessage, addNewChannel, removeSelectedChannel, renameSelectedChannel, getChannelsData }}>
            {children}
        </ChatContext.Provider>
    )
};

export default ChatContextProvider;
