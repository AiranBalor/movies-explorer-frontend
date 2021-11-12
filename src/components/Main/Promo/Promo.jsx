import './Promo.css';
import SiteNav from "../SiteNav/SiteNav";

function Promo() {
  return (
    <section className='promo'>
      <h1 className='promo__head'>Учебный проект студента факультета Веб-разработки.</h1>
      <div className='promo__nav'>
        <SiteNav to='/#aboutproject' name='О проекте'/>
        <SiteNav to='/#techs' name='Технологии'/>
        <SiteNav to='/#aboutme' name='Студент'/>
      </div>
    </section>
  )
}

export default Promo;
