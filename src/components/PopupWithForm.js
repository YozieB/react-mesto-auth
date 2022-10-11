import React from 'react'
import { useEffect } from 'react'
export default function PopupWithForm({
  name,
  isOpen,
  title,
  onClose,
  form,
  children,
  buttonText,
  onSubmit,
}) {
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
    <div className={`popup ${name} ${isOpen ? ' popup_opened' : ''}`}>
      <div className='popup__container'>
        <p className='popup__title'>{title}</p>
        <button
          type='button'
          onClick={onClose}
          className='popup__close-btn'
        ></button>
        <form
          action='#'
          name={`${form}`}
          className='popup__form'
          onSubmit={onSubmit}
        >
          {children}
          <button className='popup__form-btn' type='submit'>
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  )
}
