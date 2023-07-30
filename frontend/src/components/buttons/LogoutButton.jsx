import { useNavigate } from 'react-router-dom';
import { useAuthorization } from '../../hooks';
import { appRoutes } from '../../routes';

const LogoutButton = ({ title }) => {
  const { logOut } = useAuthorization();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate(appRoutes.loginPagePath());
    logOut();
  };

  if (localStorage.getItem('user') !== null) {
    return (
      <button type="button" className="logout-button" onClick={handleLogout}>{title}</button>
    );
  }

  return null;
};
export default LogoutButton;
