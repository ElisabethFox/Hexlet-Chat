import LoginForm from "../login-form/LoginForm";

import './style.css';

import loginImg from '../../../img/login.png';
import LoginFooter from "../login-card-footer/LoginFooter";

const LoginCard = () => {
    return (
        <div className="col-12 col-md-8 col-xxl-6">
            <div className="card shadow-sm">
                <div className="card-body row p-5">
                    <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                        <img src={loginImg} alt="Войти" className="card-img"/>
                    </div>
                    <LoginForm />
                </div>
                <LoginFooter />
            </div>
        </div>
    )
};

export default LoginCard;
