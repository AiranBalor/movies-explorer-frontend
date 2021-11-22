import {Link, NavLink} from "react-router-dom";
import logo from "../../images/logo.svg";
import { useValidationForm } from "../../hooks/useValidationForm";

function Login({ handleLogin, handleError}) {
  const {values, handleErrors, errors, isValid} = useValidationForm();

  function handleSubmit(event) {
    event.preventDefault();
    handleLogin(event, values.email, values.password);
  }

  return (
    <main className='register'>
      <NavLink className='header__logo register__logo' to='/'><img src={logo} alt="Логотип"/></NavLink>
      <h1 className='register__head'>Рады видеть!</h1>
      <form name="login-form" onSubmit={handleSubmit} className='register__form'>
        <label className='register__form-label'>E-mail</label>
        <input
          required
          autoComplete='off'
          className={`register__form-input ${errors.email && 'error'}`}
          type="email"
          name="email"
          value={values.email || ''}
          onChange={handleErrors}/>
        <span className='register__form-span'>{errors.email}</span>
        <label className='register__form-label'>Пароль</label>
        <input
          required
          autoComplete='off'
          className={`register__form-input ${errors.password && 'error'}`}
          type="password"
          name="password"
          value={values.password || ''}
          onChange={handleErrors}/>
        <span className='register__form-span'>{errors.password}</span>
        <button type='submit' className={`register-btn ${!isValid ? 'register-btn_disabled' : ""}`} disabled={!isValid}>Войти</button>
      </form>
      <div className='register__login'>
        <p>Ещё не зарегистрированы?</p>
        <Link to='/signup'>Регистрация</Link>
      </div>
    </main>
  )
}

export default Login;
