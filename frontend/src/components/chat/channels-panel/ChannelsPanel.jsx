import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useEffect, useRef } from 'react';
import { BiMessageSquareAdd } from 'react-icons/bi';
import Channel from '../channel/Channel';
import { channelsSelector, currentChannel } from '../../../selectors/selectors';
import { setCurrentChannel } from '../../../slices/channelsSlice';
import { openModalWindow, setCurrentModalType } from '../../../slices/modalWindowSlice';

import './style.css';

const ChannelsPanel = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const channels = useSelector(channelsSelector.selectAll);
  // const currentChannelData = useSelector(currentChannel);
  // const currentChannelId = currentChannelData?.id;
  // const refChannels = useRef(null);

  // const offsetHeight = document.getElementById('channels-box')?.offsetHeight;
  // const scrollHeight = document.getElementById('channels-box')?.scrollHeight;

  // useEffect(() => {
  //   if (scrollHeight > offsetHeight) {
  //     refChannels?.current?.lastElementChild?.scrollIntoView({ block: 'center', behavior: 'smooth' });
  //   }

  //   return;
  // }, [channels, currentChannelId, offsetHeight, scrollHeight]);

  const handleSetCurrentChannel = (id) => {
    dispatch(setCurrentChannel(id));
  };

  const handleCreateNewChannel = () => {
    dispatch(setCurrentModalType('add'));
    dispatch(openModalWindow());
  };

  return (
    <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b className="channels-title">{t('channel.channels')}</b>
        <button type="button" className="p-0 border-0 btn btn-group-vertical add-button" data-toggle="modal" onClick={handleCreateNewChannel}>
          <BiMessageSquareAdd className="add-icon" />
          <span className="visually-hidden">{t('channel.addBtn')}</span>
        </button>
      </div>
      <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
        {channels.map((channel) => (
          <Channel
            channel={channel}
            key={channel.id}
            onClick={() => handleSetCurrentChannel(channel.id)}
          />
        ))}
      </ul>
    </div>
  );
};

export default ChannelsPanel;
