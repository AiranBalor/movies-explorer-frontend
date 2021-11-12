import './Checkbox.css';

function Checkbox() {
  return <label className="checkbox">
    Короткометражки
    <input className="checkbox__input" type="checkbox" />
    <span className="checkbox__visible-input"/>
  </label>
}

export default Checkbox;
