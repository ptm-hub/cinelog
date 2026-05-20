// Pagina del catalogo con CRUD completo usando Firebase Firestore
// Accede a los datos a traves del servicio centralizado en services/movies-service.js
// Autor: Pablo Tapia Manchado
import { useState, useEffect } from 'react'
import { FaPlus, FaEdit, FaTrash, FaStar, FaTimes } from 'react-icons/fa'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import { getMovies, addMovie, updateMovie, deleteMovie } from '../../services/movies-service'
import './Catalog.css'

const emptyForm = {
  titulo: '',
  director: '',
  anyo: '',
  genero: '',
  puntuacion: '',
  descripcion: '',
  imagen: ''
}

function Catalog() {
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [selectedGenre, setSelectedGenre] = useState('Todos')
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingMovie, setEditingMovie] = useState(null)
  const [formData, setFormData] = useState(emptyForm)

  // Carga las peliculas de Firebase al montar el componente
  useEffect(() => {
    loadMovies()
  }, [])

  async function loadMovies() {
    try {
      setIsLoading(true)
      setHasError(false)
      const data = await getMovies()
      setMovies(data)
    } catch (error) {
      setHasError(true)
    } finally {
      setIsLoading(false)
    }
  }

  const genres = ['Todos', ...new Set(movies.map(m => m.genero))]

  const filteredMovies = movies.filter(movie => {
    const matchesSearch =
      movie.titulo.toLowerCase().includes(searchText.toLowerCase()) ||
      movie.director.toLowerCase().includes(searchText.toLowerCase())
    const matchesGenre = selectedGenre === 'Todos' || movie.genero === selectedGenre
    return matchesSearch && matchesGenre
  })

  // Elimina la pelicula de Firebase y actualiza el estado local
  async function handleDelete(movieId) {
    if (window.confirm('¿Estas seguro de que quieres eliminar esta pelicula?')) {
      try {
        await deleteMovie(movieId)
        setMovies(movies.filter(m => m.id !== movieId))
      } catch (error) {
        alert('Error al eliminar. Intentalo de nuevo.')
      }
    }
  }

  function handleEdit(movie) {
    setEditingMovie(movie)
    setFormData({
      titulo: movie.titulo,
      director: movie.director,
      anyo: String(movie.anyo),
      genero: movie.genero,
      puntuacion: String(movie.puntuacion),
      descripcion: movie.descripcion,
      imagen: movie.imagen || ''
    })
    setIsFormOpen(true)
  }

  function handleNew() {
    setEditingMovie(null)
    setFormData(emptyForm)
    setIsFormOpen(true)
  }

  function handleCloseForm() {
    setIsFormOpen(false)
    setEditingMovie(null)
  }

  function handleFormChange(event) {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
  }

  // Guarda en Firebase: actualiza si se esta editando, inserta si es nueva
  async function handleSave(event) {
    event.preventDefault()
    const movieToSave = {
      ...formData,
      anyo: Number(formData.anyo),
      puntuacion: Number(formData.puntuacion)
    }
    try {
      if (editingMovie) {
        await updateMovie(editingMovie.id, movieToSave)
        setMovies(movies.map(m =>
          m.id === editingMovie.id ? { ...movieToSave, id: editingMovie.id } : m
        ))
      } else {
        const newMovie = await addMovie(movieToSave)
        setMovies([...movies, newMovie])
      }
      handleCloseForm()
    } catch (error) {
      alert('Error al guardar. Intentalo de nuevo.')
    }
  }

  return (
    <>
      <Header />

      <main className="catalog">
        <div className="catalog__container">

          <div className="catalog__header">
            <div>
              <h1 className="catalog__title">Catalogo de Peliculas</h1>
              <p className="catalog__subtitle">
                {filteredMovies.length} de {movies.length} peliculas
              </p>
            </div>
            <button className="catalog__btn-add" onClick={handleNew}>
              <FaPlus /> Anadir Pelicula
            </button>
          </div>

          <div className="catalog__filters">
            <input
              type="text"
              placeholder="Buscar por titulo o director..."
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
              className="catalog__search"
            />
            <select
              value={selectedGenre}
              onChange={e => setSelectedGenre(e.target.value)}
              className="catalog__select"
            >
              {genres.map(genre => (
                <option key={genre} value={genre}>{genre}</option>
              ))}
            </select>
          </div>

          {isLoading && (
            <div className="catalog__loading">
              <div className="catalog__spinner"></div>
              <p>Cargando peliculas desde Firebase...</p>
            </div>
          )}

          {hasError && !isLoading && (
            <div className="catalog__error">
              Error al cargar los datos. Comprueba tu conexion e intentalo de nuevo.
              <button className="catalog__btn-retry" onClick={loadMovies}>Reintentar</button>
            </div>
          )}

          {!isLoading && !hasError && filteredMovies.length === 0 && (
            <p className="catalog__empty">
              {movies.length === 0
                ? 'No hay peliculas en Firebase. Ve a Importar/Exportar para anadir datos.'
                : 'No se encontraron peliculas con ese criterio de busqueda.'}
            </p>
          )}

          {!isLoading && !hasError && filteredMovies.length > 0 && (
            <div className="catalog__grid">
              {filteredMovies.map(movie => (
                <div key={movie.id} className="catalog__card">
                  <img
                    src={movie.imagen || 'https://via.placeholder.com/300x450?text=Sin+Imagen'}
                    alt={`Poster de ${movie.titulo}`}
                    className="catalog__card-img"
                    onError={e => {
                      e.target.src = 'https://via.placeholder.com/300x450?text=Sin+Imagen'
                    }}
                  />
                  <div className="catalog__card-body">
                    <span className="catalog__card-genre">{movie.genero}</span>
                    <h3 className="catalog__card-title">{movie.titulo}</h3>
                    <p className="catalog__card-director">{movie.director}</p>
                    <div className="catalog__card-meta">
                      <span>{movie.anyo}</span>
                      <span className="catalog__card-score">
                        <FaStar /> {movie.puntuacion}
                      </span>
                    </div>
                    <p className="catalog__card-desc">{movie.descripcion}</p>
                    <div className="catalog__card-actions">
                      <button
                        className="catalog__btn catalog__btn--edit"
                        onClick={() => handleEdit(movie)}
                      >
                        <FaEdit /> Editar
                      </button>
                      <button
                        className="catalog__btn catalog__btn--delete"
                        onClick={() => handleDelete(movie.id)}
                      >
                        <FaTrash /> Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {isFormOpen && (
          <div className="catalog__overlay" onClick={handleCloseForm}>
            <div className="catalog__modal" onClick={e => e.stopPropagation()}>
              <div className="catalog__modal-header">
                <h2 className="catalog__modal-title">
                  {editingMovie ? 'Editar Pelicula' : 'Nueva Pelicula'}
                </h2>
                <button className="catalog__modal-close" onClick={handleCloseForm}>
                  <FaTimes />
                </button>
              </div>

              <form onSubmit={handleSave} className="catalog__form">
                <div className="catalog__form-row">
                  <div className="catalog__form-group">
                    <label className="catalog__label">Titulo *</label>
                    <input type="text" name="titulo" value={formData.titulo} onChange={handleFormChange} required className="catalog__input" placeholder="Titulo de la pelicula" />
                  </div>
                  <div className="catalog__form-group">
                    <label className="catalog__label">Director *</label>
                    <input type="text" name="director" value={formData.director} onChange={handleFormChange} required className="catalog__input" placeholder="Nombre del director" />
                  </div>
                </div>
                <div className="catalog__form-row">
                  <div className="catalog__form-group">
                    <label className="catalog__label">Anyo *</label>
                    <input type="number" name="anyo" value={formData.anyo} onChange={handleFormChange} required min="1900" max="2030" className="catalog__input" placeholder="Ej: 2010" />
                  </div>
                  <div className="catalog__form-group">
                    <label className="catalog__label">Genero *</label>
                    <input type="text" name="genero" value={formData.genero} onChange={handleFormChange} required className="catalog__input" placeholder="Ej: Drama" />
                  </div>
                  <div className="catalog__form-group">
                    <label className="catalog__label">Puntuacion *</label>
                    <input type="number" name="puntuacion" value={formData.puntuacion} onChange={handleFormChange} required min="0" max="10" step="0.1" className="catalog__input" placeholder="Ej: 8.5" />
                  </div>
                </div>
                <div className="catalog__form-group">
                  <label className="catalog__label">Descripcion *</label>
                  <textarea name="descripcion" value={formData.descripcion} onChange={handleFormChange} required rows="3" className="catalog__textarea" placeholder="Breve descripcion de la trama..." />
                </div>
                <div className="catalog__form-group">
                  <label className="catalog__label">URL del poster</label>
                  <input type="url" name="imagen" value={formData.imagen} onChange={handleFormChange} className="catalog__input" placeholder="https://..." />
                </div>
                <div className="catalog__form-actions">
                  <button type="submit" className="catalog__btn-save">
                    {editingMovie ? 'Actualizar' : 'Guardar'}
                  </button>
                  <button type="button" className="catalog__btn-cancel" onClick={handleCloseForm}>
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </>
  )
}

export default Catalog
