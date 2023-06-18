import {NavLink} from "react-router-dom";
import './style.css';
import LogoutButton from "../buttons/logout-button/LogoutButton";

const NavBar = () => {
    return (
        <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
            <div className="nav-container">
                <NavLink to="/" className="navbar-brand">
                    Hexlet Chat
                </NavLink>
                <LogoutButton title="Выйти"/>
            </div>
        </nav>
    )
};

export default NavBar;