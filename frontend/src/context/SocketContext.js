import {createContext, useState} from "react";
import {useDispatch} from "react-redux";
import {addMessage} from '../slices/messagesSlice'

export const SocketContext = createContext({});

const SocketContextProvider = ({ socket, children }) => {
    const dispatch = useDispatch();
    const addNewMessage = async (message) => {
        socket.on('newMessage', (message) => {
            dispatch(addMessage(message));
        });

        await socket.emit('newMessage', { ...message });
    };

    const connectSocket = () => {
        socket.connect();

        socket.on('newMessage', (message) => {
            dispatch(addMessage(message));
        });

    }

    const disconnectSocket = () => {
        socket.off();
        socket.disconnect();
    };

        return (
        <SocketContext.Provider value={{ addNewMessage }}>
            {children}
        </SocketContext.Provider>
    )
};

export default SocketContextProvider;
