import React from 'react'

export default function InfoTooltip({ isOpen, onClose, title, imgPath }) {
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
