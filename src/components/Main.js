import React, { useState, useEffect } from "react";
import { api } from "../utils/Api";
import Card from "./Card.js"

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick}) {
  const [userName, setUserName] = useState("")
  const [userDescription, setUserDescription] = useState("")
  const [userAvatar, setUserAvatar] = useState("")
  const [cards, setCards] = useState([])

  useEffect(() => {
    Promise.all([api.getInitialCards(), api.getUserInfo()])
      .then(([initialCards, info]) => {
        setUserName(info.name)
        setUserDescription(info.about)
        setUserAvatar(info.avatar)
        setCards(initialCards)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__info">
          <button className="profile__edit-avatar-button" onClick={onEditAvatar} />
          <img className="profile__avatar" src={userAvatar} alt="Аватар" />
          <div>
            <div className="profile__container">
              <h1 className="profile__name">{userName}</h1>
              <button className="profile__edit-button" onClick={onEditProfile} />
            </div>
            <p className="profile__about">{userDescription}</p>
          </div>
        </div>
        <button className="profile__add-button" onClick={onAddPlace} />
      </section>

      <section>
        <ul className="elements">
          {
            cards.map(element => (
              <Card card={element} key={element._id} onCardClick={onCardClick} />
            ))
          }
        </ul>
      </section>
    </main>
  )
}

export default Main