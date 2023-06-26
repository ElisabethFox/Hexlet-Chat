import {useFormik} from "formik";
import Form from 'react-bootstrap/Form';
import axios from "axios";
import UserDataContext from "../context/UserDataContext";
import {useContext} from "react";
import ChannelsPanel from "../components/chat/channels-panel/ChannelsPanel";
import ChatPanel from "../components/chat/chat-panel/ChatPanel";
import ChatCard from "../components/chat/chat-card/ChatCard";

const Chat = () => {
    const formik = useFormik({
        initialValues: { message: " " },
        onSubmit: {}
    });

    return (
        <div className="container h-100 my-4 overflow-hidden rounded shadow">
            <ChatCard />
        </div>
    );
}

export default Chat;
