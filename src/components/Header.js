import headerLogo from '../images/logo.svg';
import { Link, useLocation } from 'react-router-dom';
import React from 'react';

function Header() {
    const location = useLocation();


    return (
        <header className="header">
            <img className="header__logo" src={headerLogo} alt="Логотип" />
            {location.pathname === "/sign-in" && <Link to="/sign-up" className="header__link">Регистрация</Link>}
            {location.pathname === "/sign-up" && <Link to="/sign-in" className="header__link">Войти</Link>}
        </header>
    );
}

export default Header;