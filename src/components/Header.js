import headerLogo from '../images/logo.svg';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import React from 'react';

function Header() {
    const location = useLocation();
    const navigate = useNavigate();

    function signOut() {
        localStorage.removeItem('token');
        navigate('/sign-in');
    }

    return (
        <header className="header">
            <img className="header__logo" src={headerLogo} alt="Логотип" />
            {location.pathname === "/sign-in" && <Link to="/sign-up" className="header__link">Регистрация</Link>}
            {location.pathname === "/sign-up" && <Link to="/sign-in" className="header__link">Войти</Link>}
            {location.pathname === "/" && <button onClick={signOut} className="header__button">Выйти</button>}
        </header>
    );
}

export default Header;