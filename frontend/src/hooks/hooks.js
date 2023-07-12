import { useContext } from "react";

import { SocketContext } from '../context/SocketContext';
import { UserDataContext } from "../context/UserDataContext";

export const useAuthorization = () => useContext(UserDataContext);
export const useChatApi = () => useContext(SocketContext);