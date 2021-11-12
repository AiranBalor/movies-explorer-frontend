import "./Navigation.css";
import { NavLink } from "react-router-dom";
import { useState } from "react";

function Navigation() {
  const [isNavOpened, setIsNavOpened] = useState(false);
  const [isAuth, setIsAuth] = useState(true); //стейт авторизации. чтобы увидеть header для авторизированного пользователя, измените стейт на true

  function handleNavClick() {
    setIsNavOpened(!isNavOpened);
  }

  function handleOffNavClick() {
    setIsNavOpened(false);
  }

  return (
    <>
      {isAuth ? (
        <>
          <button
            type="button"
            className={`nav__btn ${isNavOpened && "nav__btn_close"}`}
            onClick={handleNavClick}
          />
          <nav className={`nav ${isNavOpened && "nav__mobile"}`}>
            <ul className={`nav__list ${isNavOpened && "nav__list_mobile"}`}>
              <li>
                <NavLink
                  activeClassName="nav__link_active"
                  onClick={handleOffNavClick}
                  className={`nav__link nav__link-films ${isNavOpened && "nav__link_mobile"}`}
                  to="/movies"
                >
                  Фильмы
                </NavLink>
              </li>
              <li>
                <NavLink
                  activeClassName="nav__link_active"
                  onClick={handleOffNavClick}
                  className={`nav__link ${isNavOpened && "nav__link_mobile"}`}
                  to="/saved-movies"
                >
                  Сохраненные фильмы
                </NavLink>
              </li>
            </ul>
            <ul className={`nav__list ${isNavOpened && "nav__list_mobile"}`}>
              <li>
                <NavLink
                  onClick={handleOffNavClick}
                  className="nav__link-account"
                  to="/profile"
                >
                  Аккаунт{" "}
                </NavLink>
              </li>
            </ul>
          </nav>
        </>
      ) : (
        <nav className="nav nav__none-auth">
          <ul className="nav__list">
            <li>
              <NavLink className="nav__link" to="/signup">
                Регистрация
              </NavLink>
            </li>
            <li>
              <NavLink className="nav__link nav__link_green" to="/signin">
                Войти
              </NavLink>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
}

export default Navigation;
