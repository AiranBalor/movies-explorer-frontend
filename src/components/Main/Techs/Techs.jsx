import './Techs.css';
import NavTab from "../NavTab/NavTab";

function Techs() {
  return (
    <section id='techs' className='techs'>
      <h2 className='techs__head'>Технологии</h2>
      <h3 className='techs__head-additional'>7 технологий</h3>
      <p className='techs__head-desc'>На курсе веб-разработки мы освоили технологии, которые применили в дипломном
        проекте.</p>
      <div className='navTab techs__table'>
        <NavTab to='https://developer.mozilla.org/docs/Web/HTML' openNewTab={true} name='HTML' size='l'/>
        <NavTab to='https://developer.mozilla.org/docs/Web/CSS' openNewTab={true} name='CSS' size='l'/>
        <NavTab to='https://javascript.info/' openNewTab={true} name='JS' size='l'/>
        <NavTab to='https://reactjs.org/' openNewTab={true} name='React' size='l'/>
        <NavTab to='https://git-scm.com/' openNewTab={true} name='Git' size='l'/>
        <NavTab to='https://nodejsdev.ru/doc/express/' openNewTab={true} name='Express.js' size='l'/>
        <NavTab to='https://www.mongodb.com/' openNewTab={true} name='mongoDB' size='l'/>
      </div>
    </section>
  )
}

export default Techs;
