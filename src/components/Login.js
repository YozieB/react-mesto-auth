import React from 'react'

export default function Login({ onSubmit, buttonText }) {
  return (
    <div className='container entry'>
      <h1 className='entry__title'>Вход</h1>
      <form action='#' name='login' className='entry__form' onSubmit={onSubmit}>
        <label htmlFor='#' className='entry__form-field'>
          <input
            type='email'
            id='entry__input-email'
            className='entry__input popup__input_place'
            name='email'
            placeholder='Email'
            minLength='2'
            maxLength='30'
            required
            //value={cardName || ''}
            //onChange={handleChangeCardName}
          />
          {/* <span className='popup__input-place-error popup__error'></span> */}
        </label>
        <label htmlFor='#' className='entry__form-field'>
          <input
            type='password'
            id='entry__input-password'
            className='entry__input popup__input_link'
            name='password'
            placeholder='Пароль'
            required
            //value={cardLink || ''}
            //onChange={handleChangeCardLink}
          />
          {/* <span className='popup__input-link-error popup__error'></span> */}
        </label>
        <button className='entry__form-btn' type='submit'>
          {buttonText}
        </button>
      </form>
    </div>
  )
}
