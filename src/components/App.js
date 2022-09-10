import React, { useState, useEffect } from 'react';
import Header from "./Header.js";
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import { api } from '../utils/Api.js';

function App() {
  useEffect(()=>{
    document.body.classList.add('root')
  },[])

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState({name: '', link: ''})

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true)
  }

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true)
  }

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true)
  }

  const handleCardClick = (card) => {
    setSelectedCard(card)
  }

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setSelectedCard({name: '', link: ''})
  }

  return (
    <div className="page">
      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
      />
      <Footer />

      {/* попап - редактировать аватар */}
      <PopupWithForm title="Обновить аватар" name="edit-avatar" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} buttonText={"Обновить"} >
        <input
          type="url"
          className="popup__input popup__input-avatar"
          placeholder="Ссылка на аватар"
          required=""
          id="avatar-input"
          name="avatar"
        />
        <span className="popup__input-error avatar-input-error" />
      </PopupWithForm>

      {/* попап - редактировать профиль */}
      <PopupWithForm title="Редактировать профиль" name="edit-profile" isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} buttonText={"Сохранить"} >
        <input
          type="text"
          className="popup__input popup__input-name"
          required=""
          id="name-input"
          minLength={2}
          maxLength={40}
          name="name"
        />
        <span className="popup__input-error name-input-error" />
        <input
          type="text"
          className="popup__input popup__input-job"
          required=""
          id="job-input"
          minLength={2}
          maxLength={200}
          name="about"
        />
        <span className="popup__input-error job-input-error" />
      </PopupWithForm>

      {/* попап - добавить карточку */}
      <PopupWithForm title="Новое место" name="add-card" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} buttonText={"Создать"} >
        <input
          type="text"
          className="popup__input popup__input-name"
          placeholder="Название"
          required=""
          id="place-input"
          minLength={2}
          maxLength={40}
          name="name"
        />
        <span className="popup__input-error place-input-error" />
        <input
          type="url"
          className="popup__input popup__input-link"
          placeholder="Ссылка на картинку"
          required=""
          id="link-input"
          name="link"
        />
        <span className="popup__input-error link-input-error" />
      </PopupWithForm>

      {/* попап - посмотреть карточку */}
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />

    </div>
  );
}

export default App;
