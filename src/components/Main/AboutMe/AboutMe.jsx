import "./AboutMe.css";
import avatar from "../../../images/avatar.jpg";

function AboutMe() {
  return (
    <section id="aboutme" className="aboutMe">
      <h2 className="aboutMe__head">Студент</h2>
      <div className="aboutMe__table">
        <div>
          <h3 className="aboutMe__table-head">Илья</h3>
          <p className="aboutMe__table-subtitle">Веб-разработчик, 28 лет</p>
          <p className="aboutMe__table-desc">
            Я родился и живу в г. Кингисепп (Ленинградская область), закончил
            юридический факультет СпбГУАП. Мне нравится спорт, путешествия,
            видеоигры. С 2020 увлекся программированием. В настоящее время
            работаю в таможенных органах. После того, как пройду курс по
            веб-разработке, планирую найти новую работу по данной специальности.
          </p>
          <ul className="aboutMe__table-links">
            <li>
              <a
                target="_blank"
                rel="noreferrer"
                href="https://vk.com/brother_ilya"
                className="aboutMe__table-links-item"
              >
                VK
              </a>
            </li>
            <li>
              <a
                target="_blank"
                rel="noreferrer"
                href="https://github.com/AiranBalor"
                className="aboutMe__table-links-item"
              >
                Github
              </a>
            </li>
          </ul>
        </div>
        <div>
          <img
            src={avatar}
            alt="Фотография студента"
            className="aboutMe__table-avatar"
          />
        </div>
      </div>
    </section>
  );
}

export default AboutMe;
