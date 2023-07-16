import signupImg from '../../../img/registration.png'
import SignupForm from './SignupForm';

const SignupCard = () => {
    return (
        <div className="card shadow-sm">
            <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
                <img src={signupImg} alt="Регистрация" className="card-img" />
                <SignupForm />
            </div>
        </div>
    );
}
 
export default SignupCard;