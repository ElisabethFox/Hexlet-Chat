import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import Channel from "../channel/Channel";
import { channelsSelector } from "../../../selectors/selectors";
import { setCurrentChannel } from "../../../slices/channelsSlice";
import { openModalWindow, setCurrentModalType } from "../../../slices/modalWindowSlice";

import { BiMessageSquareAdd } from "react-icons/bi";
import "./style.css"

const ChannelsPanel = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const channels = useSelector(channelsSelector.selectAll);

    const handleSetCurrentChannel = (id) => {
        dispatch(setCurrentChannel(id));
    };

    const handleCreateNewChannel = () => {
        try {
            dispatch(setCurrentModalType('add'));
            dispatch(openModalWindow());
        } catch {
            console.log('error')
        }
    };
    
    return (
        <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
            <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
                <b className="channels-title">{t('channel.channels')}</b>
                <button type="button" className="p-0 border-0 btn btn-group-vertical add-button" data-toggle="modal" onClick={handleCreateNewChannel}>
                    <BiMessageSquareAdd className="add-icon"/>
                    <span className="visually-hidden">+</span>
                </button>
            </div>
            <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
                {channels.map((channel) => <Channel channel={channel} onClick={() => handleSetCurrentChannel(channel.id)}/>)}
            </ul>
        </div>
    );
};

export default ChannelsPanel;
