import { CurrentUserContext } from '../context/CurrentUserContext'
import { useContext } from 'react'
export default function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext)
  function handleImageClick() {
    onCardClick(card)
  }
  function handleLikeClick() {
    onCardLike(card)
  }
  function handleRemoveClick() {
    onCardDelete(card)
  }
  const isOwn = (card.owner || card.owner._id) === currentUser._id
  const isLiked = card.likes.some(i => (i._id || i) === currentUser._id)
  return (
    <div className='card'>
      {isOwn && (
        <button className='card__trash' onClick={handleRemoveClick}></button>
      )}
      <img
        className='image card__image'
        src={card.link}
        alt={card.name}
        onClick={handleImageClick}
      />
      <div className='card__info'>
        <h2 className='card__title'>{card.name}</h2>
        <div className='card__likes'>
          <button
            type='button'
            className={
              isLiked ? 'card__heart card__heart_active' : 'card__heart'
            }
            onClick={handleLikeClick}
          ></button>
          <div className='card__like-counter'>{card.likes.length}</div>
        </div>
      </div>
    </div>
  )
}
