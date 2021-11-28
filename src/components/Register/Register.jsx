import "./Register.css";
import logo from "../../images/logo.svg";
import { Link, NavLink } from "react-router-dom";
import { useValidationForm } from "../../hooks/useValidationForm";

function Register({ handleRegister }) {
  const { values, handleErrors, errors, isValid } = useValidationForm();

  //функция обработки сабмита, передает событие и значения инпутов в функцию регистрации из компонента App
  function handleSubmit(event) {
    event.preventDefault();
    handleRegister(event, values.name, values.email, values.password);
  }

  return (
    <main className="register">
      <NavLink className="header__logo register__logo" to="/">
        <img src={logo} alt="Логотип" />
      </NavLink>
      <h1 className="register__head">Добро пожаловать!</h1>
      <form
        name="register-form"
        className="register__form"
        onSubmit={handleSubmit}
      >
        <label className="register__form-label">Имя</label>
        <input
          autoComplete="off"
          required
          className={`register__form-input ${errors.name && "error"}`}
          type="text"
          name="name"
          value={values.name || ""}
          onChange={handleErrors}
        />
        <span className={`register__form-span ${!errors.name && "register__form-span_hidden"}`}>{errors.name}</span>
        <label className="register__form-label">E-mail</label>
        <input
          autoComplete="off"
          required
          className={`register__form-input ${errors.email && "error"}`}
          type="email"
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
          placeholder="Введите адрес электронной почты. Не забудьте указать домен, например example@example.com"
          name="email"
          value={values.email || ""}
          onChange={handleErrors}
        />
        <span className={`register__form-span ${!errors.email && "register__form-span_hidden"}`}>{errors.email}</span>
        <label className="register__form-label">Пароль</label>
        <input
          autoComplete="off"
          required
          className={`register__form-input error ${errors.password && "error"}`}
          type="password"
          name="password"
          value={values.password || ""}
          onChange={handleErrors}
        />
        <span className={`register__form-span ${!errors.password && "register__form-span_hidden"}`}>{errors.password}</span>
        <button
          type="submit"
          className={`register-btn ${!isValid && "register-btn_disabled"}`}
          disabled={!isValid}
        >
          Зарегистрироваться
        </button>
      </form>
      <div className="register__login">
        <p>Уже зарегистрированы?</p>
        <Link to="/signin">Войти</Link>
      </div>
    </main>
  );
}

export default Register;
