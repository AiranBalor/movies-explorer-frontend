import "./MoviesCardList.css";
import Preloader from "../Preloader/Preloader";
import MoviesCard from "../MoviesCard/MoviesCard";
import { useEffect, useState } from "react";

function MoviesCardList(props) {
  //Создаем 2 стейта для отрисовки начального количества карточек...
  const [initialCardsAmount, setInitialCardsAmount] = useState(() => {
    const screenWidth = window.innerWidth;
    if (screenWidth < 720) {
      return 5;
    } else if (screenWidth < 920) {
      return 8;
    } else if (screenWidth < 1280) {
      return 12;
    } else if (screenWidth >= 1280) {
      return 12;
    }
  });

  //...и отрисовки карточек по нажатию кнопки Еще
  const [addCardsAmount, setAddCardsAmount] = useState(() => {
    const screenWidth = window.innerWidth;
    if (screenWidth < 720) {
      return 2;
    } else if (screenWidth < 920) {
      return 2;
    } else if (screenWidth < 1280) {
      return 3;
    } else if (screenWidth >= 1280) {
      return 4;
    }
  });

  //определяем функцию для управления данными стейтами
  function handleResize() {
    const screenWidth = window.innerWidth;
    if (screenWidth < 720) {
      setInitialCardsAmount(5);
      setAddCardsAmount(2);
    } else if (screenWidth < 920) {
      setInitialCardsAmount(8);
      setAddCardsAmount(2);
    } else if (screenWidth < 1280) {
      setInitialCardsAmount(12);
      setAddCardsAmount(3);
    } else if (screenWidth >= 1280) {
      setInitialCardsAmount(12);
      setAddCardsAmount(4);
    }
  }

  //определяем функцию добавки карточек к их начальному значению
  function handleAddMovies() {
    setInitialCardsAmount((prev) => prev + addCardsAmount);
  }

  //определяем переменную для отрисовки карточек на основе пришедшего в компонент массива фильмов и начального значения стейта
  const renderedMovies = props.movies.slice(0, initialCardsAmount);

  //создаем эффект, срабатывающий при загрузке страницы и добавляющий слушатель
  useEffect(() => {
    window.addEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {props.isLoading && <Preloader />}
      <span
        className={`movies-card-list__span ${
          !props.moviesError && "movies-card-list__span-hidden"
        }`}
      >
        Во время запроса произошла ошибка. Возможно, проблема с соединением или
        сервер недоступен.
      </span>
      <span
        className={`movies-card-list__span ${
          !props.notFound && "movies-card-list__span-hidden"
        }`}
      >
        По указанному запросу ничего не найдено
      </span>
      <span
        className={`movies-card-list__span ${
          props.isSavedMovies && props.movies.length === 0
            ? ""
            : "movies-card-list__span-hidden"
        }`}
      >
        Вы пока ничего не сохраняли
      </span>

      <section className="movies-card-list">
        {renderedMovies.map((movie) => {
          return (
            <MoviesCard
              key={props.isSavedMovies ? movie.movieId : movie.id}
              movie={movie}
              isSavedMovies={props.isSavedMovies}
              handleSaveMovie={props.handleSaveMovie}
              handleDeleteMovie={props.handleDeleteMovie}
            />
          );
        })}
      </section>
      <button
        className={`movies-card-list__btn ${
          props.isSavedMovies
            ? "movies-card-list__btn_hidden"
            : `${
                props.movies.length === renderedMovies.length
                  ? "movies-card-list__btn_hidden"
                  : ""
              }`
        }`}
        onClick={handleAddMovies}
      >
        Ещё
      </button>
    </>
  );
}

export default MoviesCardList;
