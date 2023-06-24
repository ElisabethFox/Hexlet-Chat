import {NavLink} from "react-router-dom";
import Title from "../../components/title/Title";
import './style.css';
import notFoundImg from "../../img/404.png"

const NotFound = () => {
    return (
        <div className="text-center not-found-container">
            <img src={notFoundImg} alt="Страница не найдена" className="notFound-img"/>
            <Title title="Страница не найдена" />
            <p className="text-muted">
                <span className="to-main">Но вы можете перейти </span>
                <NavLink to="/" className="main-link">
                    на главную страницу
                </NavLink>
            </p>
        </div>
    );
}

export default NotFound;
