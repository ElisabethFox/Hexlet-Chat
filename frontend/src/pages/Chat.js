import {useFormik} from "formik";
import Form from 'react-bootstrap/Form';
import axios from "axios";
import UserDataContext from "../context/UserDataContext";
import {useContext} from "react";
import ChannelsPanel from "../components/chat/channels-panel/ChannelsPanel";
import ChatPanel from "../components/chat/chat-panel/ChatPanel";

const Chat = () => {

    const currentUser = JSON.parse(localStorage.getItem('user'))
    const token = currentUser.token
    console.log(token)

    axios.get('/api/v1/data', { headers: { Authorization: `Bearer ${token}` } }).then((response) => {
        console.log(response);
    });


    const formik = useFormik({
        initialValues: { message: " " },
        onSubmit: {}
    });

    return (
        <div className="container h-100 my-4 overflow-hidden rounded shadow">
            <div className="row h-100 bg-white flex-md-row">
                <ChannelsPanel />
                <ChatPanel />
            </div>
        </div>
    );
}

export default Chat;
