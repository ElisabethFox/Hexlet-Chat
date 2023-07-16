import { useAuthorization } from '../../../hooks/hooks';
import './style.css'
import { useNavigate } from "react-router-dom";

const LogoutButton = ({ title }) => {
    const { logOut } = useAuthorization();
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/login');
        logOut();
    }

    return (
        <button type="button" className="logout-button" onClick={handleLogout}>{title}</button>
    )
};
export default LogoutButton;