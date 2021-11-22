import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function SavedMovies(props) {
  return (
    <main className="movies">
      <SearchForm
        isSavedMovies={true}
        isShortMovies={props.isShortMovies}
        handleShortMovies={props.handleShortMovies}
        handleSearchSavedMovies={props.handleSearchSavedMovies}
      />
      <MoviesCardList
        isLoading={props.isLoading}
        movies={props.movies}
        handleDeleteMovie={props.handleDeleteMovie}
        isSavedMovies={true}
      />
    </main>
  );
}

export default SavedMovies;
