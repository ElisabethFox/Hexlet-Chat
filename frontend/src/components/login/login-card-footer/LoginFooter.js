import {NavLink} from "react-router-dom";
import './style.css'
import { useTranslation } from 'react-i18next';

const LoginFooter = () => {
    const { t } = useTranslation();
    return (
        <div className="card-footer p-4">
            <div className="text-center">
                <span className="no-account">{t('login.noAccount')} </span>
                <NavLink to="/" className="registration-link">
                    {t('registration.registrationTitle')}
                </NavLink>
            </div>
        </div>
    )
}

export default LoginFooter;
