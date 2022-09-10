import React from "react";

function PopupWithForm({title, name, isOpen, onClose, buttonText, children}){
    return(
        <div className={`popup popup_${name} ${isOpen && "popup_opened"}`}>
        <div className="popup__container">
          <button className="popup__close-button" onClick={onClose}/>
          <h2 className="popup__title">{title}</h2>
          <form className="popup__form" noValidate="" name={`popup__form-${name}`}>
            {children}
            <button className="popup__save-button" type="submit">
              {buttonText}
            </button>
          </form>
        </div>
      </div>
    )
}

export default PopupWithForm