import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LogoutButton from "../buttons/LogoutButton";

import "./style.css";

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
    );
};

export default NavBar;