import { Link } from 'react-router-dom'
import EntryComponent from './EntryComponent'
import { useState } from 'react'
import Header from './Header'
export default function Register({ isLogged, onSubmit }) {
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  function handleChangePassword(e) {
    setPassword(e.target.value)
  }
  function handleChangeEmail(e) {
    setEmail(e.target.value)
  }

  return (
    <>
      <Header isLogged={isLogged} buttonText='Войти' buttonPath='/sign-in' />
      <EntryComponent
        buttonText='Зарегистрироваться'
        title='Регистрация'
        onChangeEmail={handleChangeEmail}
        onChangePassword={handleChangePassword}
        onSubmit={() => {
          onSubmit(password, email)
        }}
        email={email}
        password={password}
      />
      <p className='entry__check'>
        Уже зарегистрированы? <Link to='/sign-in'>Войти</Link>
      </p>
    </>
  )
}
