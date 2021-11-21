import './Register.css';
import logo from '../../images/logo.svg';
import {Link, NavLink} from "react-router-dom";

function Register() {
  return (
    <main className='register'>
      <NavLink className='header__logo register__logo' to='/'><img src={logo} alt="Логотип"/></NavLink>
      <h1 className='register__head'>Добро пожаловать!</h1>
      <form className='register__form'>
        <label className='register__form-label'>Имя</label>
        <input
          autoComplete='off'
          required
          className='register__form-input'
          type="text"
          name="name"/>
        <label className='register__form-label'>E-mail</label>
        <input
          autoComplete='off'
          required
          className='register__form-input'
          type="email"
          name="email"/>
        <label className='register__form-label'>Пароль</label>
        <input
          autoComplete='off'
          required
          className='register__form-input error'
          type="password"
          name="password"/>
        <span className='register__form-span'>Что-то пошло не так...</span>
        <button type='submit' className='register-btn'>Зарегистрироваться</button>
      </form>
      <div className='register__login'>
        <p>Уже зарегистрированы?</p>
        <Link to='/signin'>Войти</Link>
      </div>
    </main>
  )
}

export default Register;
