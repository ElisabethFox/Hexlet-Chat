import SignupForm from "./SignupForm";
import { useTranslation } from "react-i18next";

import signupImg from "../../img/registration.png";

const SignupCard = () => {
    const { t } = useTranslation();

    return (
        <div className="card shadow-sm">
            <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
                <img src={signupImg} alt={t('registration.registrationTitle')} className="card-img" />
                <SignupForm />
            </div>
        </div>
    );
};
 
export default SignupCard;