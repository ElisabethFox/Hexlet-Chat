import { NavLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { appRoutes } from '../../routes';
import { useAuthorization } from '../../hooks';
import './style.css';

const NavBar = () => {
  const { t } = useTranslation();
  const { logOut } = useAuthorization();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate(appRoutes.loginPagePath());
    logOut();
  };

  const LogoutButton = (handle, title) => {
    if (localStorage.getItem('user') !== null) {
      return (
        <button type="button" className="logout-button" onClick={handle}>{title}</button>
      );
    }

    return null;
  };

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="nav-container">
        <NavLink to={appRoutes.chatPagePath()} className="navbar-brand">
          {t('navigation.chatName')}
        </NavLink>
        { LogoutButton(handleLogout, t('navigation.exitBtn')) }
      </div>
    </nav>
  );
};

export default NavBar;
