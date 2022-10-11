import React from 'react'
import { useEffect } from 'react'

export default function InfoTooltip({ isOpen, onClose, title, imgPath }) {
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
    <div className={`popup info-popup ${isOpen ? 'popup_opened' : ''}`}>
      <div className='popup__container'>
        <button
          type='button'
          className='popup__close-btn'
          onClick={onClose}
        ></button>
        <div className='info-tooltip'>
          <img
            className='image info-tooltip__image'
            src={imgPath}
            alt='Информация'
          />
          <div className='info-tooltip__title'>{title}</div>
        </div>
      </div>
    </div>
  )
}
