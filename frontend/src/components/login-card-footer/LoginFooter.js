import {NavLink} from "react-router-dom";
const LoginFooter = () => {
    return (
        <div className="card-footer p-4">
            <div className="text-center">
                <span>Нет аккаунта? </span>
                <NavLink to="/">
                    Регистрация
                </NavLink>
            </div>
        </div>
    )
}

export default LoginFooter;