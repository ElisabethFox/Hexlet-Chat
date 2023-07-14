import { useSelector } from "react-redux";
import {currentChannelSelector} from "../../../selectors/selectors"
import './style.css'
import cn from 'classnames';

const Channel = ({ channel, onClick }) => {
    const currentChannel = useSelector(currentChannelSelector);
    const isActive = () => channel.id === currentChannel.id;

    const channelClasses = cn("w-100 rounded-0 text-start channel-button", {
        'current': isActive(),
    })

    const channelMenuBtnClasses = cn("flex-grow-0 dropdown-toggle dropdown-toggle-split channel-menu-btn", {
        'current': isActive(),
    })

    return (
        <li className="nav-item w-100 channel" key={channel.id}>
                <button type="button" className={channelClasses} onClick={onClick}>
                    <span className="me-1">#</span>
                    {channel.name}
                </button>
                <button type="button" id="react-aria4736936024-3" aria-expanded="false" className={channelMenuBtnClasses}>
                    <span class="visually-hidden">Управление каналом</span>
                </button>
                <div x-placement="bottom-end" aria-labelledby="react-aria4736936024-3" class="dropdown-menu" data-popper-reference-hidden="false" data-popper-escaped="false" data-popper-placement="bottom-end">
                    <a data-rr-ui-dropdown-item="" class="dropdown-item" role="button" tabindex="0" href="#">Удалить</a>
                    <a data-rr-ui-dropdown-item="" class="dropdown-item" role="button" tabindex="0" href="#">Переименовать</a>
                </div>
        </li>
    );
}
 
export default Channel;