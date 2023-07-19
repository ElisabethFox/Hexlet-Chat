import { NavLink } from "react-router-dom";
import Title from "../components/title/Title";

import notFoundImg from "../img/404.png";

const NotFound = () => {
    return (
        <div className="text-center not-found-container">
            <img src={notFoundImg} alt="Страница не найдена" className="img-fluid" width="450"/>
            <Title title="Страница не найдена" />
            <p className="text-muted">
                <span className="to-main">Но вы можете перейти </span>
                <NavLink to="/" className="link">
                    на главную страницу
                </NavLink>
            </p>
        </div>
    );
};

export default NotFound;
