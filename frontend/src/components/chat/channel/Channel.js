import { useDispatch, useSelector } from "react-redux";
import { setCurrentChannel } from "../../../slices/channelsSlice";
import {currentChannelSelector} from "../../../selectors/selectors"
import './style.css'
import cn from 'classnames';

const Channel = ({ channel, onClick }) => {
    const currentChannelId = useSelector(currentChannelSelector.selectAll)

    return (
        <li className="nav-item w-100" key={channel.id}>
                <button type="button" className="w-100 rounded-0 text-start channel-button " onClick={onClick}>
                    <span className="me-1">#</span>
                    {channel.name}
                </button>
        </li>
    );
}
 
export default Channel;