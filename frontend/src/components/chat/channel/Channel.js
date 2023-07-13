import { useSelector } from "react-redux";
import {currentChannelSelector} from "../../../selectors/selectors"
import './style.css'
import cn from 'classnames';

const Channel = ({ channel, onClick }) => {
    const currentChannelId = useSelector(currentChannelSelector).id;
    const isActive = () => channel.id === currentChannelId;

    const channelClasses = cn("w-100 rounded-0 text-start channel-button", {
        'current': isActive(),
    })

    return (
        <li className="nav-item w-100" key={channel.id}>
                <button type="button" className={channelClasses} onClick={onClick}>
                    <span className="me-1">#</span>
                    {channel.name}
                </button>
        </li>
    );
}
 
export default Channel;