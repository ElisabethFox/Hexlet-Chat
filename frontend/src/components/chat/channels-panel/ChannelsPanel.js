import {useSelector} from "react-redux";
import {UserDataContext} from '../../../context/UserDataContext'
import { BiMessageSquareAdd } from "react-icons/bi";
import './style.css'
import {channelsSelector} from '../../../selectors/selectors'
import axios from "axios";
import {useContext, useEffect} from "react";
import {SocketContext} from "../../../context/ChatContext";

const ChannelsPanel = () => {
    const { userData } = useContext(UserDataContext);
    const addNewChannel = useContext(SocketContext).context;

    const getChannels = async () => {
        try {
            const response = await axios.get('/api/v1/data', {headers: {Authorization: `Bearer ${userData.token}`}})
            console.log(response.data.channels)
            response.data.channels.forEach((channel) => addNewChannel(channel));
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    useEffect(() => {
        getChannels()
    }, []);

    const channels = useSelector(channelsSelector.selectAll);
    console.log(channels)

    const mapped = channels.map((channel) => {
        return (
            <li className="nav-item w-100" key={channel.id}>
                <button type="button" className="w-100 rounded-0 text-start channel-button">
                    <span className="me-1">#</span>
                    {channel.name}
                </button>
            </li>
        )
    })

    return (
    <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
        <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
            <b className="channels-title">Каналы</b>
            <button type="button" className="p-0 text-primary btn btn-group-vertical add-channel-button">
                <BiMessageSquareAdd className="add-icon"/>
                <span className="visually-hidden">+</span>
            </button>
        </div>
        <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
            {mapped}
        </ul>
    </div>
    )
};

export default ChannelsPanel;
