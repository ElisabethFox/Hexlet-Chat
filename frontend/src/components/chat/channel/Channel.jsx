import { ButtonGroup, Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { currentChannelSelector } from "../../../selectors/selectors";
import { openModalWindow } from "../../../slices/modalWindowSlice";
import { setCurrentModalType } from "../../../slices/modalWindowSlice";

import cn from "classnames";
import "./style.css";


const Channel = ({ channel, onClick }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { id, name, removable } = channel;

    const currentChannel = useSelector(currentChannelSelector);
    const isActive = () => channel.id === currentChannel.id;

    const channelClasses = cn("w-100 rounded-0 text-start channel-button", {
        'current': isActive(),
    });

    const channelMenuBtnClasses = cn("flex-grow-0 dropdown-toggle dropdown-toggle-split channel-menu-btn", {
        'current': isActive(),
    });

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
            <Dropdown className="d-flex dropdown btn-group" as={ButtonGroup}>
                <button type="button" className={channelClasses} onClick={onClick}>
                    <span className="me-1">#</span>
                    {name}
                </button>

                <Dropdown.Toggle type="button" id="react-aria4736936024-3" className={channelMenuBtnClasses}>
                    <span className="visually-hidden">{t('channelControl')}</span>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item onClick={handleRemoveChannel}>{t('channel.removeChannel')}</Dropdown.Item>
                    <Dropdown.Item onClick={handleRenameChannel}>{t('channel.renameChannel')}</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </li>
    );
};
 
export default Channel;