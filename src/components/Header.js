import logo from '../images/logo.svg'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
export default function Header({
  isLogged,
  buttonText,
  buttonPath,
  onExitButtonClick,
  userEmail,
}) {
  const [isBurgerActive, setIsBurgerActive] = useState(false)
  function handleResize() {
    if (window.screen.width >= 650) {
      setIsBurgerActive(false)
    }
  }
  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  return (
    <>
      <div
        className={`header__mobile ${
          isBurgerActive ? 'header__mobile_active' : ''
        }`}
      >
        <p className='header__email'>{userEmail}</p>
        <button className='header__exit' onClick={onExitButtonClick}>
          Выйти
        </button>
      </div>
      <header
        className={`container header ${isBurgerActive ? 'header_active' : ''}`}
      >
        <img src={logo} className='image header__image' alt='Место' />
        {!isLogged ? (
          <Link className='header__link' to={buttonPath}>
            {buttonText}
          </Link>
        ) : (
          <>
            <div
              className={`burger ${isBurgerActive ? 'burger_active' : ''}`}
              onClick={() => {
                setIsBurgerActive(!isBurgerActive)
              }}
            >
              <span className='burger__line'></span>
              <span className='burger__line'></span>
              <span className='burger__line'></span>
            </div>
            <div className='header__info'>
              <p className='header__email'>{userEmail}</p>
              <button className='header__exit' onClick={onExitButtonClick}>
                Выйти
              </button>
            </div>
          </>
        )}
      </header>
    </>
  )
}
