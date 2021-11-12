import './AboutProject.css';

function AboutProject() {
  return (
    <section id='aboutproject' className='aboutPr'>
      <h2 className='aboutPr__header'>О проекте</h2>
      <div className='aboutPr__table'>
        <div className='aboutPr__item'>
          <h3 className='aboutPr__table-header'>Дипломный проект включал 5 этапов</h3>
          <p className='aboutPr__table-desc'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности
            и финальные доработки.</p>
        </div>
        <div className="aboutPr__item">
          <h3 className='aboutPr__table-header'>На выполнение диплома ушло 5 недель</h3>
          <p className='aboutPr__table-desc'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать,
            чтобы успешно защититься.</p>
        </div>
      </div>
      <div className='aboutPr__line'>
        <div className='aboutPr__line-item'>
          <p id='one' className='aboutPr__line-item-header'>1 неделя</p>
          <p className='aboutPr__line-item-desc'>Back-end</p>
        </div>
        <div className='aboutPr__line-item'>
          <p id='two' className='aboutPr__line-item-header'>4 недели</p>
          <p className='aboutPr__line-item-desc'>Front-end</p>
        </div>
      </div>
    </section>
  )
}

export default AboutProject;
