import {NavLink} from "react-router-dom";
import * as Yup from 'yup';
import Title from "../../components/title/Title";
import './style.css';
import notFoundImg from "../../img/404.jpg"

const SignupSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Минимум 2 буквы')
        .max(50, 'Максимум 20 букв')
        .required('Обязательное поле'),
    password: Yup.string()
        .min(6, 'Минимум 6 буквы')
        .max(50, 'Максимум 50 букв')
        .required('Обязательное поле'),
    email: Yup.string().email('Неверный email').required('Обязательное поле'),
});

const NotFound = () => {
    return ( 
        <div className="text-center not-found-container">
            <img src={notFoundImg} alt="Страница не найдена" className="notFound-img"/>
            <Title title="Страница не найдена" />
            <p className="text-muted">
                <span>Но вы можете перейти </span>
                <NavLink to="/">
                    на главную страницу
                </NavLink>
            </p>
        </div>
    );
}
 
export default NotFound;