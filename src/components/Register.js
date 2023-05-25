import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const [formValue, setFormValue] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    const {name, value} = e.target;

    setFormValue({
      ...formValue,
      [name]: value
    });
  }
  const handleSubmit = (e) => {
    e.preventDefault();

  }

  return (
    <div className="register">
      <p className="register__welcome">
        Регистрация
      </p>
      <form onSubmit={handleSubmit} className="register__form">
        <input id="email" className="login__input" name="email" type="email" value={formValue.email} onChange={handleChange} placeholder='Email' />
        <input id="password" className="login__input" name="password" type="password" value={formValue.password} onChange={handleChange} placeholder='Пароль' />
        <div className="register__button-container">
          <button type="submit" onSubmit={handleSubmit} className="register__link">Зарегистрироваться</button>
        </div>
      </form>
      <div className="register__signin">
        <p className="register__text">Уже зарегистрированы?</p>
        <Link to="login" className="register__login-link">Войти</Link>
      </div>
    </div>
  );
}

export default Register;