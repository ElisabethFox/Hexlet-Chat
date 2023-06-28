import {createContext, useState} from "react";
import _ from 'lodash';

export const SocketContext = createContext({});

const SocketContextProvider = ({ socket, children }) => {
    const [messages, setMessages] = useState([]);
    const addNewMessage = (message, username) => {
        socket.on('newMessage', (payload) => {
            setMessages([...messages, payload]);
        });

        socket.emit('newMessage', { message, username });
    };

    return (
        <SocketContext.Provider value={{ messages, addNewMessage }}>
            {children}
        </SocketContext.Provider>
    )

};

export default SocketContextProvider;
