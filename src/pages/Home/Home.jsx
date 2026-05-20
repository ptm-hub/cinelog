// Pagina de inicio de CineLog
// Muestra un banner principal y una seleccion de peliculas destacadas
// Usa un estado para filtrar por categoria
import { useState } from 'react'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import MovieCard from '../../components/MovieCard/MovieCard'
import { featuredData } from '../../data/featured-data'
import { initialMoviesData } from '../../data/movies-data'
import './Home.css'

function Home() {
  // Estado para controlar que categoria de peliculas se muestra en la seccion de novedades
  const [activeCategory, setActiveCategory] = useState('Todos')

  // Categorias disponibles para filtrar
  const categories = ['Todos', 'Drama', 'Accion', 'Ciencia Ficcion', 'Fantasia', 'Thriller', 'Animacion']

  // Filtra las peliculas del catalogo segun la categoria activa
  const filteredMovies = activeCategory === 'Todos'
    ? initialMoviesData.slice(0, 8)
    : initialMoviesData.filter(movie => movie.genero === activeCategory).slice(0, 8)

  return (
    <>
      <Header />

      <main className="home">

        {/* Seccion hero con la primera pelicula destacada */}
        <section className="home__hero" style={{ backgroundImage: `url(${featuredData[0].imagen})` }}>
          <div className="home__hero-overlay">
            <div className="home__hero-content">
              <span className="home__hero-label">{featuredData[0].etiqueta}</span>
              <h1 className="home__hero-title">{featuredData[0].titulo}</h1>
              <p className="home__hero-desc">{featuredData[0].descripcion}</p>
              <div className="home__hero-meta">
                <span className="home__hero-year">{featuredData[0].anyo}</span>
                <span className="home__hero-category">{featuredData[0].categoria}</span>
                <span className="home__hero-score">★ {featuredData[0].puntuacion}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Seccion de estadisticas */}
        <section className="home__stats">
          <div className="home__stats-container">
            <div className="home__stat">
              <span className="home__stat-number">{initialMoviesData.length}+</span>
              <span className="home__stat-label">Peliculas en el catalogo</span>
            </div>
            <div className="home__stat">
              <span className="home__stat-number">7</span>
              <span className="home__stat-label">Generos disponibles</span>
            </div>
            <div className="home__stat">
              <span className="home__stat-number">9.2</span>
              <span className="home__stat-label">Puntuacion maxima</span>
            </div>
            <div className="home__stat">
              <span className="home__stat-number">2024</span>
              <span className="home__stat-label">Ultimo estreno</span>
            </div>
          </div>
        </section>

        {/* Seccion de peliculas destacadas del editor */}
        <section className="home__featured">
          <div className="home__section-container">
            <h2 className="home__section-title">Seleccion del Editor</h2>
            <div className="home__featured-grid">
              {featuredData.map(item => (
                <div key={item.id} className="home__featured-card">
                  <img
                    src={item.imagen}
                    alt={item.titulo}
                    className="home__featured-img"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/500x280?text=Sin+Imagen'
                    }}
                  />
                  <div className="home__featured-info">
                    <span className="home__featured-label">{item.etiqueta}</span>
                    <h3 className="home__featured-title">{item.titulo}</h3>
                    <p className="home__featured-score">★ {item.puntuacion}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Seccion de catalogo con filtro por categoria */}
        <section className="home__catalog">
          <div className="home__section-container">
            <h2 className="home__section-title">Explora el Catalogo</h2>

            {/* Botones de categoria para filtrar - usan el estado activeCategory */}
            <div className="home__categories">
              {categories.map(category => (
                <button
                  key={category}
                  className={`home__category-btn ${activeCategory === category ? 'home__category-btn--active' : ''}`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Lista de peliculas filtradas usando el componente MovieCard con props */}
            <div className="home__movies-grid">
              {filteredMovies.length === 0 ? (
                <p className="home__no-results">No hay peliculas en esta categoria todavia.</p>
              ) : (
                filteredMovies.map(movie => (
                  <MovieCard
                    key={movie.id}
                    titulo={movie.titulo}
                    director={movie.director}
                    anyo={movie.anyo}
                    genero={movie.genero}
                    puntuacion={movie.puntuacion}
                    descripcion={movie.descripcion}
                    imagen={movie.imagen}
                  />
                ))
              )}
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  )
}

export default Home
