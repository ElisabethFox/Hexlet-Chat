import cn from "classnames";
import "./style.css";


const ModalButtton = ({ title, priority, onClick } ) => {
    const ModalButttonClasses = cn("w-40 modal-button", {
        'high': priority,
    })

    return (
        <button type={priority ? 'submit' : 'button'} className={ModalButttonClasses} onClick={onClick}>{title}</button>
    );
}
 
export default ModalButtton;