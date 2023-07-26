import cn from 'classnames';
import DropdownToggle from 'react-bootstrap/esm/DropdownToggle';
import { useEffect } from 'react';
import { useRef } from 'react';
import { ButtonGroup, Dropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { currentChannel, channelsSelector } from '../../../selectors/selectors';
import { openModalWindow, setCurrentModalType, setRelevantChannel } from '../../../slices/modalWindowSlice';

import './style.css';

const Channel = ({ channel, onClick }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const refChannels = useRef(null);
  const channels = useSelector(channelsSelector.selectAll);
  const { id, name, removable } = channel;
  const currentChannelData = useSelector(currentChannel);
  const currentChannelId = currentChannelData?.id
  const isActive = () => id === currentChannelData?.id;


  const offsetHeight = document.getElementById('channels-box')?.offsetHeight;
  const scrollHeight = document.getElementById('channels-box')?.scrollHeight;

  console.log(refChannels?.current?.id)
  console.log(refChannels?.current)

  useEffect(() => {
    if (offsetHeight < scrollHeight) {
      refChannels?.current?.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }
    return;
  }, [channels]);

  const channelClasses = cn('w-100 rounded-0 text-start channel-button', {
    'current-channel': isActive(),
  });

  const channelMenuBtnClasses = cn('flex-grow-0 dropdown-toggle-split channel-menu-btn', {
    'current-channel': isActive(),
  });

  const handleRenameChannel = (channelId) => {
    dispatch(setCurrentModalType('rename'));
    dispatch(setRelevantChannel(channelId));
    dispatch(openModalWindow());
  };

  const handleRemoveChannel = (channelId) => {
    dispatch(setCurrentModalType('remove'));
    dispatch(setRelevantChannel(channelId));
    dispatch(openModalWindow());
  };

  if (!removable) {
    return (
      <li ref={refChannels} className="nav-item channel" id={channel.id}>
        <button type="button" className={channelClasses} onClick={onClick}>
          <span className="me-1">{t('channel.prefix')}</span>
          {name}
        </button>
      </li>
    );
  }

  return (
    <li ref={refChannels} className="nav-item channel" id={channel.id}>
      <Dropdown className="d-flex dropdown btn-group" as={ButtonGroup}>
        <button type="button" className={channelClasses} onClick={onClick}>
          <span className="me-1">{t('channel.prefix')}</span>
          {name}
        </button>

        <DropdownToggle variant="channel-menu-btn" type="button" id="dropdown-menu" className={channelMenuBtnClasses}>
          <span className="visually-hidden">{t('channel.controlChannel')}</span>
        </DropdownToggle>

        <Dropdown.Menu>
          <Dropdown.Item id="dropdown-item" onClick={() => handleRemoveChannel(id)}>{t('channel.removeChannel')}</Dropdown.Item>
          <Dropdown.Item id="dropdown-item" onClick={() => handleRenameChannel(id)}>{t('channel.renameChannel')}</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </li>
  );
};

export default Channel;
