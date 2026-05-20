// Componente de tarjeta de pelicula que recibe los datos como props
// Se usa en la pagina de inicio para mostrar los destacados
// Autor: Pablo Tapia Manchado
import { FaStar } from 'react-icons/fa'
import './MovieCard.css'

// Este componente recibe los datos de una pelicula y los muestra en una tarjeta
function MovieCard({ titulo, director, anyo, genero, puntuacion, descripcion, imagen }) {
  return (
    <div className="movie-card">
      <div className="movie-card__img-wrapper">
        <img
          src={imagen}
          alt={`Poster de ${titulo}`}
          className="movie-card__img"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x450?text=Sin+Imagen'
          }}
        />
        <span className="movie-card__genre">{genero}</span>
      </div>
      <div className="movie-card__info">
        <h3 className="movie-card__title">{titulo}</h3>
        <p className="movie-card__director">{director}</p>
        <div className="movie-card__meta">
          <span className="movie-card__year">{anyo}</span>
          <span className="movie-card__rating">
            <FaStar className="movie-card__star" />
            {puntuacion}
          </span>
        </div>
        <p className="movie-card__desc">{descripcion}</p>
      </div>
    </div>
  )
}

export default MovieCard
