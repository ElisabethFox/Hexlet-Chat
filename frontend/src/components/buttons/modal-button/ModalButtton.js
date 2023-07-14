import './style.css'
import cn from 'classnames';

const ModalButtton = ({ title, priority, onClick } ) => {
    const ModalButttonClasses = cn("btn btn-outline-light modal-button", {
        'high': priority,
    })

    return (
        <button type="button" className={ModalButttonClasses} onClick={onClick}>{title}</button>
    );
}
 
export default ModalButtton;