import {useSelector} from "react-redux";
import { BiMessageSquareAdd } from "react-icons/bi";
import './style.css'
import {channelsSelector, modalWindowSelector} from '../../../selectors/selectors'
import Channel from "../channel/Channel";
import { useDispatch } from "react-redux";
import { setCurrentChannel } from "../../../slices/channelsSlice";
import { openModalWindow, setCurrentModalType } from "../../../slices/modalWindowSlice";
import { useTranslation } from "react-i18next";
import { toast } from 'react-toastify';


const ChannelsPanel = () => {
    const channels = useSelector(channelsSelector.selectAll);
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const hundleSetCurrentChannel = (id) => {
        dispatch(setCurrentChannel(id));
    };

    const hundleCreateNewChannel = () => {
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
            <button type="button" className="p-0 border-0 btn btn-group-vertical add-button" data-toggle="modal" onClick={hundleCreateNewChannel}>
                <BiMessageSquareAdd className="add-icon"/>
                <span className="visually-hidden">+</span>
            </button>
        </div>
        <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
            {channels.map((channel) => <Channel channel={channel} onClick={() => hundleSetCurrentChannel(channel.id)} isRemovable={channel.removable}/>)}
        </ul>
    </div>
    )
};

export default ChannelsPanel;
