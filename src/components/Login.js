import { entryApi } from '../utils/api'
import EntryComponent from './EntryComponent'
import { useState } from 'react'

export default function Login({ onLogin }) {
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  function handleChangePassword(e) {
    setPassword(e.target.value)
  }
  function handleChangeEmail(e) {
    setEmail(e.target.value)
  }
  function handleSubmit(e) {
    e.preventDefault()
    onLogin(password, email)
  }
  return (
    <EntryComponent
      buttonText='Войти'
      title='Вход'
      onChangeEmail={handleChangeEmail}
      onChangePassword={handleChangePassword}
      onSubmit={handleSubmit}
      inputValue={''}
    />
  )
}
