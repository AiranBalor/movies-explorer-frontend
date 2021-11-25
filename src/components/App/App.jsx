import "./App.css";
import About from "../Main/Main";
import Header from "../Header/Header";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import NotFound from "../NotFound/NotFound";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Footer from "../Footer/Footer";
import InfoTooltip from "../InfoTooltip/InfoTooltip";

import {
  statusEditMessage,
  statusErrors,
  statusErrorText,
  statusLoadMessage,
  statusSuccessMessage,
} from "../../utils/constants";
import statusSuccessImage from "../../images/success.svg";
import statusErrorImage from "../../images/error.svg";

import ProtectedRoute from "../../hoc/ProtectedRoute";
import { AppContext } from "../../contexts/AppContext";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

import { api } from "../../utils/MainApi";
import { auth } from "../../utils/auth";
import * as moviesApi from "../../utils/MoviesApi";

import { useState, useEffect, useCallback } from "react";
import {
  Switch,
  Route,
  useHistory,
  useLocation,
  Redirect,
} from "react-router-dom";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(true);
  const [movies, setMovies] = useState([]);
  const [apiMovies, setApiMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [isShortMovies, setIsShortMovies] = useState(false);
  const [moviesError, setMoviesError] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [tokenChecked, setTokenChecked] = useState(true);

  const [infoTooltip, setInfoTooltip] = useState({
    isOpen: false,
    image: statusSuccessImage,
    message: statusSuccessMessage,
  });
  const [currentUser, setCurrentUser] = useState({
    _id: "",
    name: "",
    email: "",
  });
  const history = useHistory();
  const location = useLocation();

  //Функция работы прелоадера
  function loadingPopup(value) {
    setIsLoading(value);
    setInfoTooltip({
      ...infoTooltip,
      isOpen: true,
      image: false,
      message: statusLoadMessage,
    });
  }

  //функция закрытия прелоадера
  const closePopup = useCallback(() => {
    setInfoTooltip({
      ...infoTooltip,
      isOpen: false,
    });
  }, [infoTooltip]);

  //функция обработки ошибок валидации в формах. получает форму и статус ошибки на вход,
  //фильтрует ошибку и ее сообщение, передает ее в попап статуса
  function handleError(form, statusError) {
    const errors = statusErrors.filter((error) => error.name === form.name)[0]
      .errors;
    const statusErrorMessage = errors.filter(
      (error) => error.status === statusError
    )[0].message;
    setInfoTooltip({
      ...infoTooltip,
      isOpen: true,
      image: statusErrorImage,
      message: statusErrorMessage || statusErrorText,
    });
  }

  //функция логина
  function handleLogin(event, email, password) {
    loadingPopup(true);
    auth
      .authorize(email, password)
      .then((data) => {
        setIsLoading(false);
        setInfoTooltip({ isOpen: false });
        setLoggedIn(true);
        setCurrentUser({ ...data });
        history.push("/movies");
      })
      .catch((err) => handleError(event.target, err));
  }

  //функция регистрации
  function handleRegister(event, name, password, email) {
    loadingPopup(true);
    auth
      .register(name, password, email)
      .then((data) => {
        setCurrentUser({ ...data });
        setIsLoading(false);
        setInfoTooltip({
          ...infoTooltip,
          isOpen: true,
          image: statusSuccessImage,
          message: statusSuccessMessage,
        });
        setLoggedIn(true);
        history.push("/movies");
      })
      .catch((err) => {
        handleError(event.target, err);
      });
  }
  //функция обновления юзера. записывает результат работы api в стейт текущего пользователя
  function handleUpdateUser(event, name, email) {
    loadingPopup(true);
    api
      .editProfile(name, email)
      .then((data) => {
        setCurrentUser({ ...data });
        setIsLoading(false);
        setInfoTooltip({
          ...infoTooltip,
          isOpen: true,
          image: statusSuccessImage,
          message: statusEditMessage,
        });
      })
      .catch((err) => {
        handleError(event.target, err);
      });
  }

  // Проверка токена при повторном посещении сайта.
  // Добавлена проверка состояния tokenChecked в разметку. Если токен проверен, разрешается отрисовка компонентов страницы.
  // Если токен есть в ЛХ, стейт loggedIn изменяется на true, и выполняется запрос за данными пользователя, затем по получении ответа изменяется
  // стейт tokenCheсked, позволяя отрисовку. Если же токен в ЛХ отсутствует, стейт loggerIn становится false, не позволяя попасть на защищенные роуты
  const tokenCheck = useCallback(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      setTokenChecked(false);
      setLoggedIn(true);
      auth
        .getContent(token)
        .then((res) => {
          if (res) {
            setCurrentUser({ ...res });
            setTimeout(() => {
              setTokenChecked(true);
            }, 100);
          }
        })
        .catch((err) => {
          localStorage.removeItem("jwt");
        });
    } else {
      setTokenChecked(true);
      setLoggedIn(false);
    }
  }, []);

  useEffect(() => {
    tokenCheck();
  }, [tokenCheck]);

  //Выход из аккаунта
  function signOut() {
    setLoggedIn(false);
    setCurrentUser({
      _id: "",
      name: "",
      email: "",
    });
    setApiMovies([]);
    setMovies([]);
    localStorage.removeItem("jwt");
    localStorage.removeItem("savedMovies");
    localStorage.removeItem("movies");
    history.push("/");
  }

  //обработка работы чекбокса короткометражек
  function handleShortMovies(event) {
    setIsShortMovies(event.target.checked);
  }

  // функия поиска фильмов по запросу. получает массив фильмов и ключевое слово на вход, создает массив результатов поиска
  // перебирает массив фильмов на наличие в поле фильма nameRU ключевого слова, далее, проверяет, включен ли чекбокс, и в зависимости от этого
  // помещает в массив результатов обычные фильмы или короткометражки
  function searchMoviesByKeyword(movies, keyword) {
    let foundMovies = [];

    movies.forEach((movie) => {
      if (movie.nameRU.indexOf(keyword) > -1) {
        if (isShortMovies) {
          movie.duration <= 40 && foundMovies.push(movie);
        } else {
          foundMovies.push(movie);
        }
      }
    });
    return foundMovies;
  }

  // общая функция поиска. обнуляет некоторые стейта, далее в зависимости от того, пришли ли фильмы с сервера, либо запрашивает их, записывает
  // стейт apiMovies и на них вызвает функцию поиска по ключевому слову, либо сразу вызывает последнюю и записывает результат в локальное хранилище
  function searchMovies(keyword) {
    setIsLoading(true);
    setMovies([]);
    setNotFound(false);
    setMoviesError(false);
    if (apiMovies.length === 0) {
      moviesApi
        .getMovies()
        .then((foundMovies) => {
          setApiMovies(foundMovies);
          const searchResult = searchMoviesByKeyword(foundMovies, keyword);

          if (searchResult.length === 0) {
            setNotFound(true);
            setMovies([]);
          } else {
            localStorage.setItem("movies", JSON.stringify(searchResult));
            setMovies(JSON.parse(localStorage.getItem("movies")));
          }
        })
        .catch(() => {
          setMoviesError(true);
          setMovies([]);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      const searchResult = searchMoviesByKeyword(apiMovies, keyword);

      if (searchResult.length === 0) {
        setMovies([]);
        setIsLoading(false);
        setNotFound(true);
      } else if (searchResult.length !== 0) {
        localStorage.setItem("movies", JSON.stringify(searchResult));
        setMovies(JSON.parse(localStorage.getItem("movies")));
      } else {
        setMoviesError(true);
        setMovies([]);
      }
    }
  }

  //функция сохранения (лайкания) фильмов. отправляет запрос на api, результат помещает в переменную, которая записывается в локальное хранилище,
  //также обновляет стейт сохраненных фильмов
  function saveMovie(movie) {
    api
      .saveMovie(movie)
      .then((data) => {
        const movies = [...savedMovies, data];
        setSavedMovies((prevState) => [...prevState, data]);
        localStorage.setItem("savedMovies", JSON.stringify(movies));
      })
      .catch((err) => console.log(`Error: ${err}`));
  }

  // функция поиска по сохраненным фильмам. берет сохраненки из локального хранилища и вызывает на них функция поиска по ключевому слову, которое
  // получает на вход. результат записывает в стейт.
  function searchSavedMovies(keyword) {
    const movies = JSON.parse(localStorage.getItem("savedMovies"));
    const searchResult = searchMoviesByKeyword(movies, keyword);
    setSavedMovies(searchResult);
  }

  // функция удаления фильмов. получает id фильма на удаление, вызвает api, затем фильтрует массив сохраненок по id, новые данные помещает в стейт
  // и локальное хранилище
  function deleteMovie(movieId) {
    api
      .deleteMovie(movieId)
      .then(() => {
        const filteredSavedMovies = savedMovies.filter((item) => {
          return item._id !== movieId;
        });
        setSavedMovies(filteredSavedMovies);
        localStorage.setItem(
          "savedMovies",
          JSON.stringify(filteredSavedMovies)
        );
      })
      .catch((err) => console.log(`Error: ${err}`));
  }

  // Загрузка данных пользователя
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (loggedIn && token) {
      api
        .getUserInfo()
        .then((data) => {
          setCurrentUser({ ...data });
        })
        .catch((err) => console.log(err));
    }
  }, [loggedIn]);

  // Загрузка фильмов. Некоторые запросы уходили раньше, чем определяось состояние loggedIn в вышеописанном useEffect. Это приводило к появлению
  // ошибки 401, когда действия, требующие наличия токена, выполнялись без него. Поправлено.
  useEffect(() => {
    debugger;
    const token = localStorage.getItem("jwt");
    if (loggedIn && token) {
      const movies = localStorage.getItem("movies");
      const savedMovies = localStorage.getItem("savedMovies");
      if (movies) {
        setMovies(JSON.parse(movies));
      }
      if (savedMovies) {
        setSavedMovies(JSON.parse(savedMovies));
      } else {
        api
          .getSavedMovies()
          .then((res) => {
            setSavedMovies(res);
            localStorage.setItem("savedMovies", JSON.stringify(res));
          })
          .catch((err) => console.log(err));
      }
    }
  }, [location, loggedIn]);

  return (
    <AppContext.Provider value={{ loggedIn, handleLogin, signOut }}>
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page__container">
          {tokenChecked && (
            <Switch>
              <Route path="/signup">
                {!loggedIn ? ( //если пользователь авторизирован, попасть на страницы регистрации и логина нельзя
                  <Register
                    handleRegister={handleRegister}
                    handleError={handleError}
                  />
                ) : (
                  <Redirect to="/" />
                )}
              </Route>
              <Route path="/signin">
                {!loggedIn ? (
                  <Login handleLogin={handleLogin} handleError={handleError} />
                ) : (
                  <Redirect to="/" />
                )}
              </Route>
              <ProtectedRoute path="/profile">
                <Header isLogin={loggedIn} />
                <Profile onUpdateUser={handleUpdateUser} />
              </ProtectedRoute>
              <ProtectedRoute path="/saved-movies">
                <Header isLogin={loggedIn} />
                <SavedMovies
                  isLoading={isLoading}
                  movies={savedMovies}
                  moviesError={moviesError}
                  notFound={notFound}
                  handleSearchSavedMovies={searchSavedMovies}
                  isShortMovies={isShortMovies}
                  handleDeleteMovie={deleteMovie}
                  handleShortMovies={handleShortMovies}
                />
                <Footer />
              </ProtectedRoute>
              <ProtectedRoute path="/movies">
                <Header isLogin={loggedIn} />
                <Movies
                  isLoading={isLoading}
                  movies={movies}
                  moviesError={moviesError}
                  notFound={notFound}
                  handleSearchMovies={searchMovies}
                  handleShortMovies={handleShortMovies}
                  isShortMovies={isShortMovies}
                  handleSaveMovie={saveMovie}
                  handleDeleteMovie={deleteMovie}
                />
                <Footer />
              </ProtectedRoute>
              <Route exact path="/">
                <Header isLogin={loggedIn} />
                <About />
                <Footer />
              </Route>
              <Route path="*">
                <NotFound />
              </Route>
            </Switch>
          )}
          <InfoTooltip
            isOpen={infoTooltip.isOpen}
            isLoading={isLoading}
            onClose={closePopup}
            statusImage={infoTooltip.image}
            statusMessage={infoTooltip.message}
          />
        </div>
      </CurrentUserContext.Provider>
    </AppContext.Provider>
  );
}

export default App;
