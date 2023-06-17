import Title from "../components/title/Title";
import notFoundImg from "../img/404.jpg"
const NotFound = () => {
    return ( 
        <div className="text-center">
            <img src={notFoundImg} alt="Страница не найдена" className="notFound-img"/>
            <Title title="Страница не найдена" />
        </div>
    );
}
 
export default NotFound;