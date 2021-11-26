import "./SearchForm.css";
import Checkbox from "./Checkbox/Checkbox";
import { useState } from "react";

function SearchForm(props) {
  const [searchInputValue, setSearchInputValue] = useState("");
  const [isSearchFormValid, setIsSearchFormValid] = useState(true);
  
  //обработка отправки формы. вызываем из пропсов функцию обработки фильмов, пришедших с сервера. проверка инпута на пустоту
function onSubmit(event) {
    event.preventDefault();
    if (searchInputValue) {
      return props.handleSearchMovies(searchInputValue.toLowerCase());
    } else {
      return setIsSearchFormValid(false)
    } 
  }

  //обработка инпута. проверка валидности введенных данных
  function handleChange(event) {
    setSearchInputValue(event.target.value);
    setIsSearchFormValid(event.target.checkValidity());
  }

  //в случае, если поиск происходит в сохраненных фильмах, вызовем функцию для обработки сохраненных фильмов
  function onSubmitSavedMovies(event) {
    event.preventDefault();
    props.handleSearchSavedMovies(searchInputValue);
  }

  return (
    <form
      className="search"
      name="search-form"
      onSubmit={!props.isSavedMovies ? onSubmit : onSubmitSavedMovies}
    >
      <div className="search__element">
        <input
          className="search__element-input"
          name="search"
          required
          placeholder="Введите название фильма"
          type="text"
          autoComplete="off"
          onChange={handleChange}
        />
        <span
          className={`register__form-span ${
            isSearchFormValid && "register__form-span_hidden"
          } `}
        >
          Нужно ввести ключевое слово
        </span>
        <button className="search__element-button" type="submit" onClick={onSubmit}/>
      </div>
      <Checkbox
        isShortMovies={props.isShortMovies}
        handleShortMovies={props.handleShortMovies}
      />
    </form>
  );
}

export default SearchForm;
