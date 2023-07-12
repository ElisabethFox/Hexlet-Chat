const Channel = ({ channel }) => {
    return (
        <li className="nav-item w-100" key={channel.id}>
            <button type="button" className="w-100 rounded-0 text-start channel-button">
                <span className="me-1">#</span>
                {channel.name}
            </button>
        </li>
    );
}
 
export default Channel;