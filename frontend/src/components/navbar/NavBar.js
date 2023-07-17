import {NavLink} from "react-router-dom";
import './style.css';
import LogoutButton from "../buttons/logout-button/LogoutButton";
import { useTranslation } from "react-i18next";

const NavBar = () => {
    const { t } = useTranslation();

    return (
        <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
            <div className="nav-container">
                <NavLink to="/" className="navbar-brand">
                    {t('navigation.chatName')}
                </NavLink>
                <LogoutButton title={t('navigation.exitBtn')} />
            </div>
        </nav>
    )
};

export default NavBar;