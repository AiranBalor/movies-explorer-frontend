import "./Profile.css";
import { useContext, useRef, useState } from "react";
import { useValidationForm } from "../../hooks/useValidationForm";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { AppContext } from "../../contexts/AppContext";

function Profile({ onUpdateUser }) {
  //Создаем состояние редактирования, подключаем данные из контекстов, валидацию формы, создаем реф для инпутов
  const [isEdit, setIsEdit] = useState(false);
  const value = useContext(AppContext);
  const currentUser = useContext(CurrentUserContext);
  const { values, handleErrors, errors, isValid, setIsValid } =
    useValidationForm();
  const inputRef = useRef();

  console.log(currentUser);

  console.log(isValid);

  const userCheck = (values.name === (currentUser.name || undefined) && values.email === (currentUser.email || undefined))
  console.log(userCheck);

  //функция-переключатель состояния редактирования
  function handleOnEdit() {
    setIsEdit(!isEdit);
  }
  //функция обработки сабмита формы: передает в функцию из App-компонента событие и значения инпутов при редактировании данных либо
  // значения инпутов по умолчанию, которые берутся из контекста.
  function handleSubmit(event) {
    event.preventDefault();
    onUpdateUser(
      event,
      values.name || currentUser.name,
      values.email || currentUser.email
    );
    setIsEdit(false);
    setIsValid(false); //кнопка Сохранить оставалась активной после повторной попытки редактировать данные, поскольку при первом редактировании
    //профиля при вводе чего-либо в инпуты осуществлялась проверка валидности полей, изменявшая стейт isValid. После завершения редактирования
    //значение стейта оставалось прежним (true), что позволяло сохранять одни и те же данные. Поправлено.
  }

  return (
    <main className="profile">
      <h1 className="profile__head">Привет, {currentUser.name}!</h1>
      <form name="login-form" className="profile__info" onSubmit={handleSubmit}>
        <div className="profile__info-item">
          <label className="profile__info-item-head">Имя</label>
          <div>
            <input
              type="text"
              name="name"
              className={`profile__info-item-desc ${
                isEdit && "profile__info-item-desc_active"
              }`}
              required
              onChange={handleErrors}
              placeholder="Введите имя"
              autoComplete="off"
              ref={inputRef}
              minLength="3"
              disabled={!isEdit}
              defaultValue={currentUser.name}
            />
            <span className="register__form-span profile__info-item-span">
              {errors.name}
            </span>
          </div>
        </div>
        <div className="profile__info-item">
          <label className="profile__info-item-head">E-mail</label>
          <div>
            <input
              type="email"
              name="email"
              className={`profile__info-item-desc ${
                isEdit && "profile__info-item-desc_active"
              }`}
              required
              placeholder="Введите почту"
              ref={inputRef}
              onChange={handleErrors}
              autoComplete="off"
              disabled={!isEdit}
              defaultValue={currentUser.email}
            />
            <span className="register__form-span profile__info-item-span">
              {errors.email}
            </span>
          </div>
        </div>
      </form>
      <div className="profile__setup">
        {isEdit ? (
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={
              !isValid ||
              (values.name === (currentUser.name || undefined) &&
              values.email === (currentUser.email || undefined))
            }
            className={`profile__setup-edit ${
              !isValid ||
              (values.name === (currentUser.name || undefined) &&
              values.email === (currentUser.email || undefined))
                ? "profile__setup-edit_disabled"
                : ""
            }`}
          >
            Сохранить
          </button>
        ) : (
          <button
            type="button"
            onClick={handleOnEdit}
            className="profile__setup-edit"
          >
            Редактировать
          </button>
        )}
        <button
          type="button"
          onClick={value.signOut} //вызывается функция из контекста приложения
          className="profile__setup-out"
        >
          Выйти из аккаунта
        </button>
      </div>
    </main>
  );
}

export default Profile;
