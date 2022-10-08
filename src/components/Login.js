import EntryComponent from './EntryComponent'
import { useState } from 'react'
import Header from './Header'

export default function Login({ onLogin, isLogged }) {
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  function handleChangePassword(e) {
    setPassword(e.target.value)
  }
  function handleChangeEmail(e) {
    setEmail(e.target.value)
  }
  function handleSubmit() {
    onLogin(password, email)
  }
  return (
    <>
      <Header
        isLogged={isLogged}
        buttonText='Регистрация'
        buttonPath='/sign-up'
      />
      <EntryComponent
        buttonText='Войти'
        title='Вход'
        onChangeEmail={handleChangeEmail}
        onChangePassword={handleChangePassword}
        onSubmit={handleSubmit}
        inputValue={''}
      />
    </>
  )
}
