import './Checkbox.css';

function Checkbox({ isShortMovies, handleShortMovies }) {
  return <label className="checkbox">
    Короткометражки
    <input className="checkbox__input" type="checkbox" onChange={handleShortMovies} checked={isShortMovies} />
    <span className="checkbox__visible-input"/>
  </label>
}

export default Checkbox;
