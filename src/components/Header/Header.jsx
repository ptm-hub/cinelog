// Componente de cabecera con navegacion responsive
// En movil aparece un menu hamburguesa que despliega los enlaces
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { FaBars, FaTimes, FaFilm } from 'react-icons/fa'
import './Header.css'

function Header() {
  // Estado para controlar si el menu movil esta abierto o cerrado
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen)
  }

  function closeMenu() {
    setIsMenuOpen(false)
  }

  function getNavClass({ isActive }) {
    return isActive ? 'header__link header__link--active' : 'header__link'
  }

  return (
    <header className="header">
      <div className="header__container">

        <NavLink to="/" className="header__logo" onClick={closeMenu}>
          <FaFilm className="header__logo-icon" />
          <span className="header__logo-text">CineLog</span>
        </NavLink>

        <button
          className="header__hamburger"
          onClick={toggleMenu}
          aria-label="Abrir menu de navegacion"
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <nav className={`header__nav ${isMenuOpen ? 'header__nav--open' : ''}`}>
          <NavLink to="/" className={getNavClass} onClick={closeMenu} end>
            Inicio
          </NavLink>
          <NavLink to="/catalogo" className={getNavClass} onClick={closeMenu}>
            Catalogo
          </NavLink>
          <NavLink to="/noticias" className={getNavClass} onClick={closeMenu}>
            Noticias
          </NavLink>
          <NavLink to="/importar-exportar" className={getNavClass} onClick={closeMenu}>
            Importar/Exportar
          </NavLink>
          <NavLink to="/contacto" className={getNavClass} onClick={closeMenu}>
            Contacto
          </NavLink>
        </nav>

      </div>
    </header>
  )
}

export default Header
