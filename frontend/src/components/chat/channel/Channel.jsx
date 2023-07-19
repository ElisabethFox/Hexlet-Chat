import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { currentChannelSelector } from "../../../selectors/selectors";
import { openModalWindow } from "../../../slices/modalWindowSlice";
import { setCurrentModalType, setRelevantChannel } from "../../../slices/modalWindowSlice";

import cn from "classnames";
import "./style.css";


const Channel = ({ channel, onClick }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { id, name, removable } = channel;

    const currentChannel = useSelector(currentChannelSelector);
    const isActive = () => channel.id === currentChannel.id;
    const [isBtnActive, setBtnActive] = useState(false);

    const menuClasses = cn("dropdown-menu", {
        'show': isBtnActive,
    });

    const channelClasses = cn("w-100 rounded-0 text-start channel-button", {
        'current': isActive(),
    });

    const channelMenuBtnClasses = cn("flex-grow-0 dropdown-toggle dropdown-toggle-split channel-menu-btn", {
        'current': isActive(),
    });

    const handleSetBtnActive = (id) => {
        setBtnActive(!isBtnActive);
        dispatch(setRelevantChannel(id))
    };

    const handleRenameChannel = () => {
        dispatch(setCurrentModalType('rename'));
        dispatch(openModalWindow());
    };

    const handleRemoveChannel = () => {
        dispatch(setCurrentModalType('remove'));
        dispatch(openModalWindow());
    };

    if (!removable) {
        return (
            <li className="nav-item w-100 channel" key={id}>
                <div role="group" className="d-flex dropdown btn-group">
                    <button type="button" className={channelClasses} onClick={onClick}>
                        <span className="me-1">#</span>
                        {name}
                    </button>
                </div>    
            </li>
        )
    }

    return (
        <li className="nav-item w-100 channel" key={id}>
            <div role="group" className="d-flex dropdown btn-group">
                <button type="button" className={channelClasses} onClick={onClick}>
                    <span className="me-1">#</span>
                    {name}
                </button>

                <button type="button" id="react-aria4736936024-3" aria-expanded="false" className={channelMenuBtnClasses} onClick={() => handleSetBtnActive(id)}>
                    <span class="visually-hidden">{t('channel.controlChannel')}</span>
                </button>
            
                <div x-placement="bottom-end" aria-labelledby="react-aria4736936024-3" className={menuClasses} data-popper-reference-hidden="false" data-popper-escaped="false" data-popper-placement="bottom-end">
                    <Link class="dropdown-item" role="button" href="#" onClick={handleRemoveChannel}>{t('channel.removeChannel')}</Link>
                    <Link class="dropdown-item" role="button" href="#" onClick={handleRenameChannel}>{t('channel.renameChannel')}</Link>
                </div>
            </div>    
        </li>
    );
};
 
export default Channel;