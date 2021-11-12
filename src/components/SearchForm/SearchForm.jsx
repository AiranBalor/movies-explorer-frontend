import './SearchForm.css';
import Checkbox from "./Checkbox/Checkbox";

function SearchForm() {
  return (
    <form className='search'>
      <div className='search__element'>
        <input
          className='search__element-input'
          name='search'
          required
          placeholder='Фильм'
          type="text"
          autoComplete="off"
        />
        <button className='search__element-button' type='submit'/>
      </div>
      <Checkbox/>
    </form>
  )
}

export default SearchForm;
