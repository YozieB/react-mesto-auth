import logo from '../images/logo.svg'
import { Link } from 'react-router-dom'
export default function Header({
  isLogged,
  buttonText,
  buttonPath,
  onExitButtonClick,
  userEmail,
}) {
  return (
    <header className='container header'>
      <img src={logo} className='image header__image' alt='Место' />
      {!isLogged ? (
        <Link className='header__link' to={buttonPath}>
          {buttonText}
        </Link>
      ) : (
        <div className='header__info'>
          <p className='header__email'>{userEmail}</p>
          <button className='header__exit' onClick={onExitButtonClick}>
            Выйти
          </button>
        </div>
      )}
    </header>
  )
}
