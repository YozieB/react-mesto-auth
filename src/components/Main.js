import { useContext } from 'react'
import Card from './Card'
import { CurrentUserContext } from '../context/CurrentUserContext'
import Header from './Header'

export default function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  onCardDelete,
  onCardLike,
  cards,
  onLoad,
  isLogged,
  onExitButtonClick,
  userEmail,
}) {
  const currentUser = useContext(CurrentUserContext)
  const cardElements = cards.map(card => (
    <Card
      key={card._id}
      card={card}
      onCardClick={onCardClick}
      onCardLike={onCardLike}
      onCardDelete={onCardDelete}
    />
  ))
  return (
    <>
      <Header
        isLogged={isLogged}
        onExitButtonClick={onExitButtonClick}
        userEmail={userEmail}
      />
      <main>
        <section className='container profile'>
          {onLoad ? (
            <div className='loader'></div>
          ) : (
            <picture className='profile__image-wrapper' onClick={onEditAvatar}>
              <img
                className='image profile__image'
                src={`${currentUser.avatar}`}
                alt='Пользователь'
              />
            </picture>
          )}
          <div className='profile__info'>
            <div className='profile__name'>
              <h1 className='profile__title'>
                {onLoad ? 'Загрузка...' : `${currentUser.name}`}
              </h1>
              <button
                type='button'
                className='profile__edit-btn'
                onClick={onEditProfile}
              ></button>
            </div>
            <p className='profile__about'>
              {onLoad ? 'Загрузка...' : `${currentUser.about}`}
            </p>
          </div>
          <button
            type='button'
            className='profile__add-btn'
            onClick={onAddPlace}
          ></button>
        </section>
        <section className='container gallery'>{cardElements}</section>
      </main>
    </>
  )
}
