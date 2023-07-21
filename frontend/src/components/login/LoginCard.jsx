import { useTranslation } from 'react-i18next';
import LoginForm from './LoginForm';
import LoginFooter from './LoginFooter';

import loginImg from '../../img/login.png';

const LoginCard = () => {
  const { t } = useTranslation();

  return (
    <div className="col-12 col-md-8 col-xxl-6">
      <div className="card shadow-sm">
        <div className="card-body row p-5">
          <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
            <img src={loginImg} alt={t('login.loginTitle')} className="card-img" />
          </div>
          <LoginForm />
        </div>
        <LoginFooter />
      </div>
    </div>
  );
};

export default LoginCard;
