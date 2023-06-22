import LoginCard from "../../components/login-card/LoginCard";
import axios from "axios";

const Login = () => {

    return (
        <div className="container-fluid h-100">
            <div className="d-flex row justify-content-center align-content-center h-100">
                <LoginCard />
            </div>
        </div>
    );
}
 
export default Login;