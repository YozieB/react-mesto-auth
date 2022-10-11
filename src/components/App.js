import { useEffect, useState } from 'react'
import Footer from './Footer'
import ImagePopup from './ImagePopup'
import Main from './Main'
import PopupWithForm from './PopupWithForm'
import { api } from '../utils/Api'
import { entryApi } from '../utils/Auth'
import { CurrentUserContext } from '../context/CurrentUserContext'
import EditProfilePopup from './EditProfilePopup'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'
import Login from './Login'
import Register from './Register'
import ProtectedRoute from './ProtectedRoute'
import InfoTooltip from './InfoTooltip'
import authTrue from '../images/authtrue.svg'
import authFalse from '../images/authfalse.svg'
import Loader from './Loader'

function App() {
  const [dataInfoTooltip, setDataInfoTooltip] = useState({
    title: '',
    imgPath: '',
  })
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false)
  const [isInfoTooltipOpen, setInfoTooltipOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState(null)
  const [currentUser, setCurrentUser] = useState({})
  const [cards, setInitialCards] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isLogged, setIsLogged] = useState(false)
  const [userEmail, setUserEmail] = useState('')
  const isAnyPopupOpened =
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    selectedCard ||
    isInfoTooltipOpen
  const navigate = useNavigate()

  useEffect(() => {
    if (isLogged) {
      setIsLoading(true)
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([user, cards]) => {
          setCurrentUser(user)
          setInitialCards(cards)
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
  }, [isLogged])
  /*   useEffect(() => {
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
    if (isAnyPopupOpened) {
      document.addEventListener('keydown', closeByEscape)
      document.addEventListener('mousedown', closeByClickOutside)
      return () => {
        document.removeEventListener('keydown', closeByEscape)
        document.removeEventListener('mousedown', closeByClickOutside)
      }
    }
  }, [isAnyPopupOpened]) */

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
    setInfoTooltipOpen(false)
    setTimeout(() => {
      setDataInfoTooltip({
        title: '',
        imgPath: '',
      })
    }, 300)
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
    const token = localStorage.getItem('token')
    if (token) {
      entryApi
        .checkUserToken(token)
        .then(res => {
          if (res) {
            setUserEmail(res.data.email)
            setIsLogged(true)
            navigate('/')
          }
        })
        .catch(error => console.log(`Error: ${error}`))
    }
  }, [navigate])
  function handleExit() {
    localStorage.removeItem('token')
    navigate('/sign-in')
    setIsLogged(false)
  }

  function handleLoginUser(password, email) {
    setIsLoading(true)
    entryApi
      .signUser(password, email)
      .then(res => {
        localStorage.setItem('token', res.token)
        setIsLogged(true)
        navigate('/')
      })
      .finally(() => {
        setIsLoading(false)
      })
      .catch(() => {
        setInfoTooltipOpen(true)
        setDataInfoTooltip({
          title: 'Что-то пошло не так! Попробуйте ещё раз.',
          imgPath: authFalse,
        })
      })
  }
  function handleRegisterSubmit(password, email) {
    setIsLoading(true)
    entryApi
      .registerUser(password, email)
      .then(() => {
        navigate('/sign-in')
        setDataInfoTooltip({
          title: 'Вы успешно зарегистрировались',
          imgPath: authTrue,
        })
      })
      .finally(() => {
        setIsLoading(false)
        setInfoTooltipOpen(true)
      })
      .catch(() => {
        setDataInfoTooltip({
          title: 'Что-то пошло не так! Попробуйте ещё раз.',
          imgPath: authFalse,
        })
      })
  }
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>
        <Route
          path='/sign-up'
          element={
            isLoading ? (
              <Loader />
            ) : (
              <Register
                isLogged={isLogged}
                isOpen={isAnyPopupOpened}
                onSubmit={handleRegisterSubmit}
              />
            )
          }
        />
        <Route
          path='/sign-in'
          element={
            isLoading ? (
              <Loader />
            ) : (
              <Login onLogin={handleLoginUser} isLogged={isLogged} />
            )
          }
        />
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
              onExitButtonClick={handleExit}
              userEmail={userEmail}
            />
          }
        />
        <Route
          path='*'
          element={
            isLogged ? (
              <Navigate to='/' replace />
            ) : (
              <Navigate to='/sign-in' replace />
            )
          }
        />
      </Routes>
      {isLogged && <Footer />}
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
        buttonText={/* isLoading ? 'Сохранение...' : */ 'Сохранить'}
      />
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddCardPlace={handleAddPlaceSubmit}
        buttonText={/* isLoading ? 'Создание...' : */ 'Создать'}
      />
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
        buttonText={/* isLoading ? 'Сохранение...' : */ 'Сохранить'}
      />
      <PopupWithForm
        name='remove-popup'
        form='#'
        title='Вы уверены?'
        buttonText={/* isLoading ? 'Удаление...' : */ 'Удалить'}
      />
      <ImagePopup
        isOpen={selectedCard}
        card={selectedCard}
        onClose={closeAllPopups}
      />
      <InfoTooltip
        onClose={closeAllPopups}
        title={dataInfoTooltip.title}
        imgPath={dataInfoTooltip.imgPath}
        isOpen={isInfoTooltipOpen}
      />
    </CurrentUserContext.Provider>
  )
}

export default App
