import {NavLink} from "react-router-dom";
import './style.css'
const LoginFooter = () => {
    return (
        <div className="card-footer p-4">
            <div className="text-center">
                <span className="no-account">Нет аккаунта? </span>
                <NavLink to="/" className="registration-link">
                    Регистрация
                </NavLink>
            </div>
        </div>
    )
}

export default LoginFooter;
