import logo from '../images/logo.svg'
export default function Header() {
  return (
    <header className='container header'>
      <a
        onClick={() => {
          localStorage.removeItem('token')
          console.log(localStorage)
        }}
      >
        zalupa
      </a>
      <img src={logo} className='image header__image' alt='Место' />
    </header>
  )
}
