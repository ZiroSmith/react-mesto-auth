import doneLogo from '../images/Done-icon.svg';
// import errorLogo from '../images/Error-icon.svg';
import './InfoTooltip.css';

function InfoTooltip({ isOpen, onClose }) {
    return (
        <div className={`popup popup_type_tooltip ${isOpen ? "popup_opened" : ""}`}>
            <div className="popup__tooltip">
                <button className="popup__close-button" onClick={onClose} type="button" aria-label="Закрыть"></button>
                <img className="tooltip__logo" src={doneLogo} alt="Успех"/>
                <h2 className="tooltip__text">Вы успешно зарегистрировались!</h2>
                {/* <img className="tooltip__logo" src={errorLogo} alt="Ошибка"/>
                <h2 className="tooltip__text">Что-то пошло не так!</h2>
                <h2 className="tooltip__text">Попробуйте ещё раз.</h2> */}
            </div>
        </div>
    );
}

export default InfoTooltip;