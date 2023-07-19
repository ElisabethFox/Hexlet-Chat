import { useNavigate } from "react-router-dom";
import { useAuthorization } from "../../hooks/hooks";

import "./style.css";

const LogoutButton = ({ title }) => {
    const { logOut } = useAuthorization();
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/login');
        logOut();
    }

    if (localStorage.getItem('user') !== null) {
        return (
            <button type="button" className="logout-button" onClick={handleLogout}>{title}</button>
        )
    };

    return null;
};
export default LogoutButton;