import { useEffect } from 'react'
export default function ImagePopup({ card, onClose, isOpen }) {
  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === 'Escape') {
        onClose()
      }
    }
    function closeByClickOutside(evt) {
      if (evt.target.classList.contains('popup_opened')) {
        onClose()
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', closeByEscape)
      document.addEventListener('mousedown', closeByClickOutside)
      return () => {
        document.removeEventListener('keydown', closeByEscape)
        document.removeEventListener('mousedown', closeByClickOutside)
      }
    }
  }, [isOpen])
  return (
    <div className={`popup image-popup ${card !== null ? 'popup_opened' : ''}`}>
      <div className='popup__container popup__container_image'>
        <button
          type='button'
          className='popup__close-btn'
          onClick={onClose}
        ></button>
        <img
          className='popup__image-pic'
          src={card !== null ? card.link : ''}
          alt={card !== null ? card.name : ''}
        />
        <div className='popup__image-title'>
          {card !== null ? card.name : ''}
        </div>
      </div>
    </div>
  )
}
