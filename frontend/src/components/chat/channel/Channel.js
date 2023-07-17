import { useDispatch, useSelector } from "react-redux";
import {currentChannelSelector} from "../../../selectors/selectors"
import cn from 'classnames';
import { Link } from "react-router-dom";
import "./style.css"
import { openModalWindow } from "../../../slices/modalWindowSlice";
import { useTranslation } from 'react-i18next';
import { useState } from "react";

const Channel = ({ channel, onClick }) => {
    const currentChannel = useSelector(currentChannelSelector);
    const isActive = () => channel.id === currentChannel.id;
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const [isBtnActive, setBtnActive] = useState(false);

    const menuClasses = cn("dropdown-menu", {
        'show': isBtnActive,
    });

    const hundleSetBtnActive = () => {
        setBtnActive(!isBtnActive);
    }

    const channelClasses = cn("w-100 rounded-0 text-start channel-button", {
        'current': isActive(),
    })

    const channelMenuBtnClasses = cn("flex-grow-0 dropdown-toggle dropdown-toggle-split channel-menu-btn", {
        'current': isActive(),
    })

    const hundleRenameChannel = () => {
        dispatch(openModalWindow());
    };

    const hundleDeleteChannel = () => {
        dispatch(openModalWindow());
    };

    return (
        <li className="nav-item w-100 channel" key={channel.id}>
            <div role="group" className="d-flex dropdown btn-group">
                <button type="button" className={channelClasses} onClick={onClick}>
                    <span className="me-1">#</span>
                    {channel.name}
                </button>

                <button type="button" id="react-aria4736936024-3" aria-expanded="false" className={channelMenuBtnClasses} onClick={hundleSetBtnActive}>
                    <span class="visually-hidden">{t('channel.controlChannel')}</span>
                </button>
            

                <div x-placement="bottom-end" aria-labelledby="react-aria4736936024-3" className={menuClasses} data-popper-reference-hidden="false" data-popper-escaped="false" data-popper-placement="bottom-end">
                    <Link class="dropdown-item" role="button" href="#" onClick={hundleDeleteChannel}>{t('channel.removeChannel')}</Link>
                    <Link class="dropdown-item" role="button" href="#" onClick={hundleRenameChannel}>{t('channel.renameChannel')}</Link>
                </div>
            </div>    
        </li>
    );
}
 
export default Channel;