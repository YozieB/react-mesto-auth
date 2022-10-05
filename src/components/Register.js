import { Link, useNavigate } from 'react-router-dom'
import { entryApi } from '../utils/api'
import EntryComponent from './EntryComponent'
import { useState } from 'react'
export default function Register() {
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const navigate = useNavigate()
  function handleChangePassword(e) {
    setPassword(e.target.value)
  }
  function handleChangeEmail(e) {
    setEmail(e.target.value)
  }
  function handleSubmit(e) {
    e.preventDefault()
    entryApi
      .registerUser(password, email)
      .then(res => {
        console.log(res)
        navigate('/sign-in')
        resetInputValues()
      })
      .catch(error => console.log(`Error: ${error}`))
  }

  function resetInputValues() {
    setPassword('')
    setEmail('')
  }

  return (
    <>
      <EntryComponent
        buttonText='Зарегистрироваться'
        title='Регистрация'
        onChangeEmail={handleChangeEmail}
        onChangePassword={handleChangePassword}
        onSubmit={handleSubmit}
        email={email}
        password={password}
      />
      <p className='entry__check'>
        Уже зарегистрированы? <Link to='/sign-in'>Войти</Link>
      </p>
    </>
  )
}
