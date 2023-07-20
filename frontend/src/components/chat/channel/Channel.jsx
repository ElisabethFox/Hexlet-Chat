import { ButtonGroup, Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { currentChannelSelector } from "../../../selectors/selectors";
import { openModalWindow } from "../../../slices/modalWindowSlice";
import { setCurrentModalType, setRelevantChannel } from "../../../slices/modalWindowSlice";

import cn from "classnames";
import "./style.css";
import DropdownToggle from "react-bootstrap/esm/DropdownToggle";


const Channel = ({ channel, onClick }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { id, name, removable } = channel;

    const currentChannel = useSelector(currentChannelSelector);
    const isActive = () => channel.id === currentChannel.id;

    const channelClasses = cn("w-100 rounded-0 text-start channel-button", {
        'current': isActive(),
    });

    const channelMenuBtnClasses = cn("flex-grow-0 dropdown-toggle-split channel-menu-btn", {
        'current': isActive(),
    });

    const handleRenameChannel = (id) => {
        dispatch(setCurrentModalType('rename'));
        dispatch(setRelevantChannel(id));
        dispatch(openModalWindow());
    };

    const handleRemoveChannel = (id) => {
        dispatch(setCurrentModalType('remove'));
        dispatch(setRelevantChannel(id));
        dispatch(openModalWindow());
    };

    if (!removable) {
        return (
            <li className="nav-item w-100 channel" key={id}>
                    <button type="button" className={channelClasses} onClick={onClick}>
                        <span className="me-1">#</span>
                        {name}
                    </button> 
            </li>
        )
    }

    return (
        <li className="nav-item w-100 channel" key={id}>
            <Dropdown className="d-flex dropdown btn-group" as={ButtonGroup}>
                <button type="button" className={channelClasses} onClick={onClick}>
                    <span className="me-1">#</span>
                    {name}
                </button>

                <DropdownToggle variant="channel-menu-btn" type="button" id="dropdown-menu" className={channelMenuBtnClasses}>
                    <span className="visually-hidden">{t('channel.controlChannel')}</span>
                </DropdownToggle>

                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleRemoveChannel(channel.id)}>{t('channel.removeChannel')}</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleRenameChannel(channel.id)}>{t('channel.renameChannel')}</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </li>
    );
};
 
export default Channel;