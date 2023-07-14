import './style.css'
import cn from 'classnames';

const ModalButtton = ({ title, priority } ) => {
    const ModalButttonClasses = cn("btn btn-outline-light modal-button", {
        'high': priority,
    })

    return (
        <button type="button" className={ModalButttonClasses}>{title}</button>
    );
}
 
export default ModalButtton;