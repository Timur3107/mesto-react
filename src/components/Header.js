import React from "react";
import logoHeader from "../images/Mesto-logo.png"

function Header() {
  return (
    <header className="header">
      <img src={logoHeader} alt="Место" className="header__logo" />
    </header>
  )
}
export default Header