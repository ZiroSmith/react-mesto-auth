import doneLogo from '../images/Done-icon.svg';
import errorLogo from '../images/Error-icon.svg';

function InfoTooltip({ isOpen, onClose, isCheckSignUp, signUpText}) {
    return (
        <div className={`popup popup_type_tooltip ${isOpen ? "popup_opened" : ""}`}>
            <div className="tooltip">
                <button className="popup__close-button" onClick={onClose} type="button" aria-label="Закрыть"></button>
                <img className="tooltip__logo" src={isCheckSignUp ? doneLogo : errorLogo} alt={isCheckSignUp ? "Успех" : "Ошибка"}/>
                <h2 className="tooltip__text">{signUpText}</h2>
            </div>
        </div>
    );
}

export default InfoTooltip;