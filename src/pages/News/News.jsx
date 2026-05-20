// Pagina de noticias que lee un feed RSS de entretenimiento de la BBC
// Usa useEffect para hacer la peticion al API cuando carga la pagina
import { useState, useEffect } from 'react'
import { FaRss, FaExternalLinkAlt, FaClock } from 'react-icons/fa'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import './News.css'

// URL del feed RSS y el proxy que lo convierte a JSON para evitar el problema de CORS
const RSS_FEED_URL = 'https://feeds.bbci.co.uk/news/entertainment_and_arts/rss.xml'
const RSS_API_URL = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(RSS_FEED_URL)}`

function News() {
  const [newsItems, setNewsItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  // Cargamos las noticias del RSS cuando el componente se monta
  useEffect(() => {
    fetch(RSS_API_URL)
      .then(res => res.json())
      .then(data => {
        if (data.status === 'ok') {
          setNewsItems(data.items)
        } else {
          setHasError(true)
        }
        setIsLoading(false)
      })
      .catch(() => {
        setHasError(true)
        setIsLoading(false)
      })
  }, [])

  // Formatea la fecha en formato legible en espanol
  function formatDate(dateString) {
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  return (
    <>
      <Header />

      <main className="news">
        <div className="news__container">

          <div className="news__header">
            <div className="news__header-icon">
              <FaRss />
            </div>
            <div>
              <h1 className="news__title">Noticias de Entretenimiento</h1>
              <p className="news__subtitle">
                Noticias en tiempo real del mundo del cine y la television via{' '}
                <a
                  href={RSS_FEED_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="news__rss-link"
                >
                  RSS de BBC Entertainment
                </a>
              </p>
            </div>
          </div>

          {/* Estado de carga */}
          {isLoading && (
            <div className="news__loading">
              <div className="news__spinner"></div>
              <p>Cargando noticias...</p>
            </div>
          )}

          {/* Mensaje de error si falla la peticion */}
          {hasError && !isLoading && (
            <div className="news__error">
              <p>No se han podido cargar las noticias. Comprueba tu conexion a internet e intentalo de nuevo.</p>
              <a
                href={RSS_FEED_URL}
                target="_blank"
                rel="noreferrer"
                className="news__error-link"
              >
                Ver el feed RSS directamente
              </a>
            </div>
          )}

          {/* Lista de noticias del RSS */}
          {!isLoading && !hasError && (
            <div className="news__grid">
              {newsItems.map((item, index) => (
                <article key={index} className="news__card">
                  {item.thumbnail && (
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="news__card-img"
                      onError={e => {
                        e.target.style.display = 'none'
                      }}
                    />
                  )}
                  <div className="news__card-body">
                    <div className="news__card-meta">
                      <span className="news__card-category">
                        {item.categories && item.categories[0] ? item.categories[0] : 'Entretenimiento'}
                      </span>
                      <span className="news__card-date">
                        <FaClock /> {formatDate(item.pubDate)}
                      </span>
                    </div>
                    <h2 className="news__card-title">{item.title}</h2>
                    <p className="news__card-desc">
                      {item.description.replace(/<[^>]*>/g, '').substring(0, 180)}...
                    </p>
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noreferrer"
                      className="news__card-link"
                    >
                      Leer noticia completa <FaExternalLinkAlt />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          )}

        </div>
      </main>

      <Footer />
    </>
  )
}

export default News
