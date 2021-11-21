import './NotFound.css';
import {Link} from "react-router-dom";

function NotFound() {
  return (
    <section className='notFound'>
      <div className='NotFound__text'>
        <h1 className='notFound__head'>404</h1>
        <p className='notFound__desc'>Страница не найдена</p>
      </div>
      <Link className='notFound__link' to='/'>Назад</Link>
    </section>
  )
}

export default NotFound;
