import { useEffect, useState } from 'react'
import Footer from './Footer'
import Header from './Header'
import ImagePopup from './ImagePopup'
import Main from './Main'
import PopupWithForm from './PopupWithForm'
import { api, entryApi } from '../utils/api'
import { CurrentUserContext } from '../context/CurrentUserContext'
import EditProfilePopup from './EditProfilePopup'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'
import Login from './Login'
import Register from './Register'
import ProtectedRoute from './ProtectedRoute'

function App() {
  document.body.classList.add('page')
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState(null)
  const [currentUser, setCurrentUser] = useState({})
  const [cards, setInitialCards] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isLogged, setIsLogged] = useState(false)
  const isOpen =
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    selectedCard
  const navigate = useNavigate()

  useEffect(() => {
    setIsLoading(true)
    api
      .getUserInfo()
      .then(user => {
        setCurrentUser(user)
      })
      .catch(error => console.log(`Error: ${error}`))
      .finally(() => {
        setIsLoading(false)
      })

    api
      .getInitialCards()
      .then(card => {
        setInitialCards(card)
      })
      .catch(error => console.log(`Error: ${error}`))
  }, [])
  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === 'Escape') {
        closeAllPopups()
      }
    }
    function closeByClickOutside(evt) {
      if (evt.target.classList.contains('popup_opened')) {
        closeAllPopups()
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

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true)
  }
  function handleEditProfileClick() {
    setEditProfilePopupOpen(true)
  }
  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true)
  }
  function closeAllPopups() {
    setEditAvatarPopupOpen(false)
    setEditProfilePopupOpen(false)
    setAddPlacePopupOpen(false)
    setSelectedCard(null)
  }
  function handleCardClick(card) {
    setSelectedCard(card)
  }
  function handleUpdateUser(user) {
    setIsLoading(true)
    api
      .setUserInfo(user.name, user.about)
      .then(result => {
        setCurrentUser(result)
        closeAllPopups()
      })
      .catch(error => console.log(`Error: ${error}`))
      .finally(() => {
        setIsLoading(false)
      })
  }
  function handleUpdateAvatar(avatar) {
    setIsLoading(true)
    api
      .updateAvatar(avatar.avatar)
      .then(result => {
        setCurrentUser(result)
        closeAllPopups()
      })
      .finally(() => {
        setIsLoading(false)
      })
      .catch(error => console.log(`Error: ${error}`))
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id)

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then(newCard => {
        setInitialCards(state =>
          state.map(c => (c._id === card._id ? newCard : c))
        )
      })
      .catch(error => console.log(`Error: ${error}`))
  }

  function handleCardDelete(card) {
    api
      .removeCard(card._id)
      .then(() => {
        setInitialCards(state => state.filter(c => c._id !== card._id))
      })
      .catch(error => console.log(`Error: ${error}`))
  }

  function handleAddPlaceSubmit(card) {
    api
      .addCard(card.name, card.link)
      .then(card => {
        setInitialCards([card, ...cards])
        closeAllPopups()
      })
      .catch(error => console.log(`Error: ${error}`))
  }

  useEffect(() => {
    if (localStorage.token) {
      const jwt = localStorage.getItem('token')
      if (jwt) {
        entryApi.checkUserToken(jwt).then(res => {
          if (res) {
            setIsLogged(true)
            navigate('/')
          }
        })
      }
    }
  }, [navigate])

  function handleLoginUser(password, email) {
    entryApi
      .signUser(password, email)
      .then(res => {
        localStorage.setItem('token', res.token)
        setIsLogged(true)
        navigate('/')
      })
      .catch(error => console.log(`Error: ${error}`))
  }
  function handleExit() {
    localStorage.removeItem('jwt')
    navigate('/sign-in')
    setIsLogged(false)
  }
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header />
      <Routes>
        <Route path='/sign-up' element={<Register />} />
        <Route path='/sign-in' element={<Login onLogin={handleLoginUser} />} />
        <Route
          path='/'
          element={
            <ProtectedRoute
              isLogged={isLogged}
              component={Main}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              cards={cards}
              onCardDelete={handleCardDelete}
              onLoad={isLoading}
            />
          }
        />
      </Routes>
      {isLogged && <Footer />}
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
        buttonText={isLoading ? 'Сохранение...' : 'Сохранить'}
      />
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddCardPlace={handleAddPlaceSubmit}
        buttonText={isLoading ? 'Создание...' : 'Создать'}
      />
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
        buttonText={isLoading ? 'Сохранение...' : 'Сохранить'}
      />
      <PopupWithForm
        name='remove-popup'
        form='#'
        title='Вы уверены?'
        buttonText={isLoading ? 'Удаление...' : 'Удалить'}
      />
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
    </CurrentUserContext.Provider>
  )
}

export default App
