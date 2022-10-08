import React from 'react'
export default function EntryComponent({
  title,
  buttonText,
  onSubmit,
  onChangeEmail,
  onChangePassword,
  email,
  password,
}) {
  return (
    <>
      <div className='container entry'>
        <h1 className='entry__title'>{title}</h1>
        <form
          action='#'
          name='login'
          className='entry__form'
          onSubmit={e => {
            e.preventDefault()
            onSubmit()
          }}
        >
          <label htmlFor='#' className='entry__form-field'>
            <input
              type='email'
              id='entry__input-email'
              className='entry__input popup__input_place'
              name='email'
              placeholder=' '
              minLength='2'
              maxLength='30'
              required
              onChange={onChangeEmail}
              value={'' || email}
            />
            <span className='entry__placeholder'>Email</span>
          </label>
          <label htmlFor='#' className='entry__form-field'>
            <input
              type='password'
              id='entry__input-password'
              className='entry__input popup__input_link'
              name='password'
              placeholder=' '
              required
              onChange={onChangePassword}
              value={'' || password}
            />
            <span className='entry__placeholder'>Пароль</span>
          </label>
          <button className='entry__form-btn' type='submit'>
            {buttonText}
          </button>
        </form>
      </div>
    </>
  )
}
