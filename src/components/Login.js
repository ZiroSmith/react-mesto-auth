import React, {useState} from 'react';
import './Login.css';

const Login = () => {
  const [formValue, setFormValue] = useState({
    email: '',
    password: ''
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
    if (!formValue.username || !formValue.password){
      return;
    }
  }

  return (
    <div className="login">
      <p className="login__welcome">
        Вход
      </p>
      <form onSubmit={handleSubmit} className="login__form">
        <input className="login__input" required id="username" name="email" type="text" value={formValue.username} onChange={handleChange} placeholder='Email' />
        <input className="login__input" required id="password" name="password" type="password" value={formValue.password} onChange={handleChange} placeholder='Пароль' />
        <div className="login__button-container">
          <button type="submit" className="login__link">Войти</button>
        </div>
      </form>
    </div>
  )
}

export default Login;