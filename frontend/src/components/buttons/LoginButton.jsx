import "./style.css";

const LoginButton = ({ title }) => {
    return (
        <button type="submit" className="w-100 mb-3 login-button">{title}</button>
    );
};

export default LoginButton;