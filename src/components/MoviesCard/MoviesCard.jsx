import "./MoviesCard.css";

function MoviesCard({ preview, name, duration, saved, collection }) {
  return (
    <>
      {collection ? (
        saved ? (
          <div className="movies-card">
            <button type="button" className="movies-card__delete-btn" />
            <div className="movies-card__item">
              <img
                className="movies-card__item-image"
                src={`${preview}`}
                alt={name}
              />
            </div>
            <div className="movies-card__item movies-card__info">
              <h3 className="movies-card__item-header">{name}</h3>
              <p className="movies-card__item-duration">{duration}</p>
            </div>
          </div>
        ) : undefined
      ) : (
        <div className="movies-card">
          {saved ? (
            <button type="button" className="movies-card__item-saved" />
          ) : (
            <button type="button" className="movies-card__item-save" />
          )}
          <div className="movies-card__item">
            <img
              className="movies-card__item-image"
              src={`${preview}`}
              alt={name}
            />
          </div>
          <div className="movies-card__item movies-card__info">
            <h3 className="movies-card__item-header">{name}</h3>
            <p className="movies-card__item-duration">{duration}</p>
          </div>
        </div>
      )}
    </>
  );
}

export default MoviesCard;
