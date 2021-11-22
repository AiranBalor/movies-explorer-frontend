import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function Movies({
  isLoading,
  movies,
  moviesError,
  notFound,
  handleSearchMovies,
  handleShortMovies,
  isShortMovies,
  handleSaveMovie,
  handleDeleteMovie,
}) {
  return (
    <main className="movies">
      <SearchForm
        handleSearchMovies={handleSearchMovies}
        isShortMovies={isShortMovies}
        handleShortMovies={handleShortMovies}
      />
      <MoviesCardList
        isLoading={isLoading}
        movies={movies}
        moviesError={moviesError}
        notFound={notFound}
        handleSaveMovie={handleSaveMovie}
        handleDeleteMovie={handleDeleteMovie}
      />
    </main>
  );
}

export default Movies;
