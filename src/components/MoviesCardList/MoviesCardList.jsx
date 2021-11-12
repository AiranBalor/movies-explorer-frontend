import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import moviesData from "../../vendor/dataMovies";

function MoviesCardList(props) {
  return (
    <>
      <section className="movies-card-list">
        {moviesData.map((movie, index) => (
          <MoviesCard
            key={index}
            name={movie.name}
            duration={movie.duration}
            preview={movie.preview}
            saved={movie.saved}
            collection={props.collection}
          />
        ))}
      </section>
      <button className="movies-card-list__btn">Ещё</button>
    </>
  );
}

export default MoviesCardList;
