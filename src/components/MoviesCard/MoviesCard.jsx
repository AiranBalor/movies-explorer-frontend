import "./MoviesCard.css";
import { useCallback, useEffect, useState } from "react";
import notFoundImage from "../../images/notFoundImage.jpg";

function MoviesCard(props) {
  const [isSaved, setIsSaved] = useState(false);

  //определим, какие варианты есть у данных фильма
  const filmData = {
    country: props.movie.country || "Не указано",
    director: props.movie.director || "Не указано",
    duration: props.movie.duration || 0,
    year: props.movie.year || "Не указано",
    description: props.movie.description || "Не указано",
    image: `${
      props.movie.image === null
        ? `${notFoundImage}`
        : `https://api.nomoreparties.co${props.movie.image?.url}`
    }`,
    trailer: props.movie?.trailerLink,
    nameRU: props.movie.nameRU || "Не указано",
    nameEN: props.movie.nameEN || "Не указано",
    thumbnail: `https://api.nomoreparties.co${props.movie.image?.formats?.thumbnail?.url}`,
    movieId: props.movie.id,
  };

  //фильтрация времени на часы и минуты
  const formattedTime = `${Math.trunc(filmData.duration / 60)}ч ${
    filmData.duration % 60
  }м`;

  //проверка сохраненных фильмов
  const isLikedMovie = useCallback(() => {
    if (localStorage.getItem("savedMovies")) {
      let savedMovies = JSON.parse(localStorage.getItem("savedMovies"));
      if (savedMovies.some((movie) => movie.nameRU === props.movie.nameRU)) {
        setIsSaved(true);
      }
    }
  }, [props.movie.nameRU]);

  function handleDislikeMovie() {
    const savedMovies = JSON.parse(localStorage.getItem("savedMovies"));
    const card = savedMovies.find(
      (movie) => movie.nameRU === props.movie.nameRU
    );
    props.handleDeleteMovie(card._id);
    setIsSaved(false);
  }

  function handleSaveMovie() {
    props.handleSaveMovie(filmData);
    setIsSaved(true);
  }

  function handleDeleteMovie() {
    setIsSaved(false);
    props.handleDeleteMovie(props.movie._id);
  }

  useEffect(() => {
    isLikedMovie();
  }, [isLikedMovie]);

  return (
    <div className="movies-card">
      {props.isSavedMovies ? (
        <button
          type="button"
          className="movies-card__delete-btn"
          onClick={handleDeleteMovie}
        />
      ) : (
        <button
          type="button"
          className={`${
            isSaved ? "movies-card__item-saved" : "movies-card__item-save"
          }`}
          onClick={!isSaved ? handleSaveMovie : handleDislikeMovie}
        ></button>
      )}
      <div className="movies-card__item movies-card__info">
        <h3 className="movies-card__item-header">{props.movie.nameRU}</h3>
        <p className="movies-card__item-duration">{`${formattedTime}`}</p>
      </div>
      <div className="movies-card__item movies-card__item-preview">
        <a
          rel="noreferrer"
          target="_blank"
          href={
            props.isSavedMovies ? props.movie.trailer : props.movie.trailerLink
          }
          className="movies-card__item-link"
        >
          <img
            className="movies-card__item-image"
            src={props.isSavedMovies ? props.movie.image : filmData.image}
            alt={`Картинка фильма ${props.movie.nameRU}`}
          />
        </a>
      </div>
    </div>
  );
}

export default MoviesCard;
