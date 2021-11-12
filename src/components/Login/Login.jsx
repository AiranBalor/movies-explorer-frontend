import {Link, NavLink} from "react-router-dom";
import logo from "../../images/logo.svg";

function Login() {
  return (
    <main className='register'>
      <NavLink className='header__logo register__logo' to='/'><img src={logo} alt="Логотип"/></NavLink>
      <h1 className='register__head'>Рады видеть!</h1>
      <form className='register__form'>
        <label className='register__form-label'>E-mail</label>
        <input
          required
          autoComplete='off'
          className='register__form-input'
          type="email"
          name="email"/>
        <label className='register__form-label'>Пароль</label>
        <input
          required
          autoComplete='off'
          className='register__form-input error'
          type="password"
          name="password"/>
        <button type='submit' className='register-btn'>Войти</button>
      </form>
      <div className='register__login'>
        <p>Ещё не зарегистрированы?</p>
        <Link to='/signup'>Регистрация</Link>
      </div>
    </main>
  )
}

export default Login;
