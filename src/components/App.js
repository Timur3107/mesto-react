import React, { useState, useEffect } from 'react';
import { api } from '../utils/Api.js';
import { currentUserContext } from '../contexts/CurrentUserContext.js';
import Header from "./Header.js";
import Main from './Main.js';
import Footer from './Footer.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import ImagePopup from './ImagePopup.js';

function App() {
  useEffect(() => {
    document.body.classList.add('root')
  }, [])

  // useState Hooks:
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState({ name: '', link: '' })
  const [cards, setCards] = useState([])
  const [currentUser, setCurrentUser] = useState({})

  // запросы к API:
  // загрузка начальных карточек и информации профиля
  useEffect(() => {
    Promise.all([api.getInitialCards(), api.getUserInfo()])
      .then(([initialCards, info]) => {
        setCards(initialCards)
        setCurrentUser(info)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  // лайк карточки
  const handleCardLike = (card) => {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
      .catch((error) => {
        console.log(error)
      })
  }

  // удаление карточки
  const handleCardDelete = (card) => {
    api.deleteCard(card._id).then(() => {
      setCards(cards.filter((currentUser) => {
        return currentUser._id !== card._id
      }))
    })
      .catch((error) => {
        console.log(error)
      })
  }

  // обновить профиль
  const handleUpdateUser = (info) => {
    api.setUserInfo(info.name, info.about).then((info) => {
      setCurrentUser(info)
      closeAllPopups()
    })
      .catch((error) => {
        console.log(error)
      })
  }

  // обновить аватар
  const handleUpdateAvatar = (info) => {
    api.setAvatar(info.avatar).then((info) => {
      setCurrentUser(info)
      closeAllPopups()
    })
      .catch((error) => {
        console.log(error)
      })
  }

  // добавить новую карточку
  const handleAddPlaceSubmit = (newCard) => {
    api.addCard(newCard).then((newCard) => {
      setCards([newCard, ...cards])
      closeAllPopups()
    })
      .catch((error) => {
        console.log(error)
      })
  }

  // открытие попапов:
  // попап - редактировать аватар
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true)
  }

  // попап - редактировать профиль
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true)
  }

  // попап - добавить карточку
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true)
  }

  // попап - посмотреть карточку
  const handleCardClick = (card) => {
    setSelectedCard(card)
  }

  // закрытие всех попапов:
  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setSelectedCard({ name: '', link: '' })
  }

  return (
    <currentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />
        <Footer />

        {/* попап - редактировать аватар */}
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} isClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

        {/* попап - редактировать профиль */}
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

        {/* попап - добавить карточку */}
        <AddPlacePopup isOpen={isAddPlacePopupOpen} isClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />

        {/* попап - посмотреть карточку */}
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

      </div>
    </currentUserContext.Provider>

  );
}

export default App;
