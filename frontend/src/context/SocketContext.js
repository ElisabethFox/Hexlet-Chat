import {createContext, useState} from "react";
import _ from 'lodash';

export const SocketContext = createContext({});

const SocketContextProvider = ({ socket, children }) => {
    const [messages, setMessages] = useState([]);
    const addNewMessage = async (message, username) => {
        await socket.emit('newMessage', { message, username });
    };

    const connectSocket = () => {
        socket.connect();

        socket.on('newMessage', (payload) => {
            setMessages([...messages, payload]);
        });

    }

    const disconnectSocket = () => {
        socket.off();
        socket.disconnect();
    };

        return (
        <SocketContext.Provider value={{ messages, addNewMessage }}>
            {children}
        </SocketContext.Provider>
    )
};

export default SocketContextProvider;
