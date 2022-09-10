import React from "react";

function Card({ card, onCardClick }) {

  const handleClick = () => {
    onCardClick(card);
  }

  return (
    <li className="element">
      <button className="element__delete" type="button" />
      <img src={card.link} alt={card.name} className="element__image" onClick={handleClick} />
      <div className="element__mask-group">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__container-likes">
          <button className="element__like-button" />
          <p className="element__counter-likes">{card.likes.length}</p>
        </div>
      </div>
    </li>
  )
}

export default Card