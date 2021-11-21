import './Profile.css';

function Profile() {
  return (
    <main className='profile'>
      <h1 className='profile__head'>Привет, Виталий!</h1>
      <div className='profile__info'>
        <div className='profile__info_item'>
          <p className='profile__info_item_head'>Имя</p>
          <p className='profile__info_item_desc'>Виталий</p>
        </div>
        <div className='profile__info_item'>
          <p className='profile__info_item_head'>E-mail</p>
          <p className='profile__info_item_desc'>pochta@yandex.ru</p>
        </div>
      </div>
      <div className='profile__setup'>
        <a href='/edit' className='profile__setup_edit'>Редактировать</a>
        <a href='/logout' className='profile__setup_out'>Выйти из аккаунта</a>
      </div>
    </main>
  )
}

export default Profile;
