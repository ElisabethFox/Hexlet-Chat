import {createContext, useMemo, useState} from "react";
import {useDispatch} from "react-redux";
import {addMessage} from '../slices/messagesSlice'
import {addChannel, addChannels} from "../slices/channelsSlice";

export const SocketContext = createContext({});

const SocketContextProvider = ({ socket, children }) => {
    const dispatch = useDispatch();

    const context = useMemo (() => {
        const addNewMessage = async (message) => {
            socket.on('newMessage', (message) => {
                dispatch(addMessage(message));
            });
    
            await socket.emit('newMessage', { ...message });
        };
    
        const addNewChannel = async (channel) => {
            socket.on('newChannel', (channel) => {
                dispatch(addChannel(channel));
            });
    
            await socket.emit('newChannel', { ...channel });
        }; 
        
        return (addNewMessage, addNewChannel)
    }, [dispatch, socket]);

    // const addCurrentChannels = async (channels) => {
    //     socket.on('currenttChannels', (channels) => {
    //         dispatch(addChannels(channels));
    //     });

    //     await socket.emit('newChannel', { ...channels });
    // }

    // const connectSocket = () => {
    //     socket.connect();

    //     socket.on('newMessage', (message) => {
    //         dispatch(addMessage(message));
    //     });

    // }

    // const disconnectSocket = () => {
    //     socket.off();
    //     socket.disconnect();
    // };

        return (
        <SocketContext.Provider value={{ context }}>
            {children}
        </SocketContext.Provider>
    )
};

export default SocketContextProvider;
