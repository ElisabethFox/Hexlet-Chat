import {NavLink} from "react-router-dom";
// import * as Yup from 'yup';
import Title from "../../components/title/Title";
import './style.css';
import notFoundImg from "../../img/404.jpg"

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