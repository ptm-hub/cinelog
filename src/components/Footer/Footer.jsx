// Componente de pie de pagina con informacion legal, redes sociales y navegacion
// Autor: Pablo Tapia Manchado
import { Link } from 'react-router-dom'
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaGithub,
  FaFilm
} from 'react-icons/fa'
import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">

        <div className="footer__section">
          <div className="footer__brand">
            <FaFilm className="footer__brand-icon" />
            <span className="footer__brand-name">CineLog</span>
          </div>
          <p className="footer__description">
            Tu plataforma de catalogo de peliculas. Descubre, guarda y descubre
            las mejores peliculas del mundo del cine.
          </p>
          <div className="footer__social">
            <a
              href="https://facebook.com"
              className="footer__social-link"
              target="_blank"
              rel="noreferrer"
              aria-label="Ir a Facebook"
            >
              <FaFacebook />
            </a>
            <a
              href="https://twitter.com"
              className="footer__social-link"
              target="_blank"
              rel="noreferrer"
              aria-label="Ir a Twitter"
            >
              <FaTwitter />
            </a>
            <a
              href="https://instagram.com"
              className="footer__social-link"
              target="_blank"
              rel="noreferrer"
              aria-label="Ir a Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="https://youtube.com"
              className="footer__social-link"
              target="_blank"
              rel="noreferrer"
              aria-label="Ir a YouTube"
            >
              <FaYoutube />
            </a>
            <a
              href="https://github.com/pablo-tapia-manchado"
              className="footer__social-link"
              target="_blank"
              rel="noreferrer"
              aria-label="Ir a GitHub"
            >
              <FaGithub />
            </a>
          </div>
        </div>

        <div className="footer__section">
          <h4 className="footer__subtitle">Navegacion</h4>
          <ul className="footer__list">
            <li><Link to="/" className="footer__link">Inicio</Link></li>
            <li><Link to="/catalogo" className="footer__link">Catalogo de Peliculas</Link></li>
            <li><Link to="/noticias" className="footer__link">Noticias de Cine</Link></li>
            <li><Link to="/contacto" className="footer__link">Contacto</Link></li>
          </ul>
        </div>

        <div className="footer__section">
          <h4 className="footer__subtitle">Legal</h4>
          <ul className="footer__list">
            <li>
              <a
                href="https://www.iubenda.com/privacy-policy/example"
                target="_blank"
                rel="noreferrer"
                className="footer__link"
              >
                Politica de Privacidad
              </a>
            </li>
            <li>
              <a
                href="https://www.iubenda.com/privacy-policy/example/cookie-policy"
                target="_blank"
                rel="noreferrer"
                className="footer__link"
              >
                Politica de Cookies
              </a>
            </li>
            <li>
              <a
                href="https://www.confianzaonline.es/consumidores/condiciones-generales-de-venta/"
                target="_blank"
                rel="noreferrer"
                className="footer__link"
              >
                Condiciones de Venta
              </a>
            </li>
          </ul>
        </div>

        <div className="footer__section">
          <h4 className="footer__subtitle">Recursos</h4>
          <ul className="footer__list">
            <li>
              <a
                href="https://github.com/pablo-tapia-manchado/cinelog"
                target="_blank"
                rel="noreferrer"
                className="footer__link"
              >
                GitHub del Proyecto
              </a>
            </li>
            <li>
              <a
                href="https://www.figma.com"
                target="_blank"
                rel="noreferrer"
                className="footer__link"
              >
                Diseño en Figma
              </a>
            </li>
            <li>
              <a
                href="https://feeds.bbci.co.uk/news/entertainment_and_arts/rss.xml"
                target="_blank"
                rel="noreferrer"
                className="footer__link"
              >
                RSS de Noticias
              </a>
            </li>
          </ul>
        </div>

      </div>

      <div className="footer__bottom">
        <p>
          &copy; 2024 CineLog. Todos los derechos reservados.
          <a
            href="https://www.iubenda.com/privacy-policy/example/cookie-policy"
            target="_blank"
            rel="noreferrer"
            className="footer__link footer__link--inline"
          >
            {' '}Politica de Privacidad y Cookies
          </a>
          {' '}|
          <a
            href="https://www.confianzaonline.es/consumidores/condiciones-generales-de-venta/"
            target="_blank"
            rel="noreferrer"
            className="footer__link footer__link--inline"
          >
            {' '}Condiciones de Venta
          </a>
        </p>
      </div>
    </footer>
  )
}

export default Footer
