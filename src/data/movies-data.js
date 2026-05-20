// Array principal de peliculas para el catalogo con operaciones CRUD
// Autor: Pablo Tapia Manchado

export const initialMoviesData = [
  {
    id: 1,
    titulo: 'El Padrino',
    director: 'Francis Ford Coppola',
    anyo: 1972,
    genero: 'Drama',
    puntuacion: 9.2,
    descripcion: 'La historia de la familia Corleone, una de las familias mafiosas mas poderosas de Nueva York. Un retrato epico del crimen organizado en America.',
    imagen: 'https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsLorgD1p0jjT.jpg'
  },
  {
    id: 2,
    titulo: 'Inception',
    director: 'Christopher Nolan',
    anyo: 2010,
    genero: 'Ciencia Ficcion',
    puntuacion: 8.8,
    descripcion: 'Un ladron que roba secretos corporativos a traves de la tecnologia de los suenos recibe la tarea inversa de plantar una idea en la mente de un director ejecutivo.',
    imagen: 'https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg'
  },
  {
    id: 3,
    titulo: 'El Caballero Oscuro',
    director: 'Christopher Nolan',
    anyo: 2008,
    genero: 'Accion',
    puntuacion: 9.0,
    descripcion: 'Batman enfrenta al Joker, un criminal que quiere sumir a Ciudad Gotica en el caos absoluto. Una pelicula que redefinio el genero de superheroes.',
    imagen: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg'
  },
  {
    id: 4,
    titulo: 'Pulp Fiction',
    director: 'Quentin Tarantino',
    anyo: 1994,
    genero: 'Drama',
    puntuacion: 8.9,
    descripcion: 'Las vidas de dos sicarios, un boxeador y varios criminales se entrecruzan en historias interconectadas llenas de violencia y humor negro.',
    imagen: 'https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg'
  },
  {
    id: 5,
    titulo: 'Forrest Gump',
    director: 'Robert Zemeckis',
    anyo: 1994,
    genero: 'Drama',
    puntuacion: 8.8,
    descripcion: 'La historia extraordinaria de Forrest Gump, un hombre de Alabama que sin buscarlo acaba siendo protagonista de los momentos historicos mas importantes de su epoca.',
    imagen: 'https://image.tmdb.org/t/p/w500/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg'
  },
  {
    id: 6,
    titulo: 'Matrix',
    director: 'Lana Wachowski, Lilly Wachowski',
    anyo: 1999,
    genero: 'Ciencia Ficcion',
    puntuacion: 8.7,
    descripcion: 'Un hacker descubre que la realidad tal como la conoce es una simulacion creada por maquinas que esclavizan a la humanidad.',
    imagen: 'https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg'
  },
  {
    id: 7,
    titulo: 'Interstellar',
    director: 'Christopher Nolan',
    anyo: 2014,
    genero: 'Ciencia Ficcion',
    puntuacion: 8.7,
    descripcion: 'Un grupo de exploradores viaja a traves de un agujero de gusano en busca de un nuevo hogar para la humanidad cuando la Tierra se esta muriendo.',
    imagen: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg'
  },
  {
    id: 8,
    titulo: 'El Senor de los Anillos: El Retorno del Rey',
    director: 'Peter Jackson',
    anyo: 2003,
    genero: 'Fantasia',
    puntuacion: 9.0,
    descripcion: 'Frodo y Sam continuan su viaje a Mordor para destruir el Anillo Unico mientras sus amigos luchan en la batalla decisiva por la Tierra Media.',
    imagen: 'https://image.tmdb.org/t/p/w500/rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg'
  },
  {
    id: 9,
    titulo: 'Goodfellas',
    director: 'Martin Scorsese',
    anyo: 1990,
    genero: 'Drama',
    puntuacion: 8.7,
    descripcion: 'La historia de Henry Hill y su vida en la mafia desde sus comienzos en el barrio hasta convertirse en informante del FBI.',
    imagen: 'https://image.tmdb.org/t/p/w500/aKuFiU82s5ISJpGZp7YkIr3kCUd.jpg'
  },
  {
    id: 10,
    titulo: 'El Silencio de los Corderos',
    director: 'Jonathan Demme',
    anyo: 1991,
    genero: 'Thriller',
    puntuacion: 8.6,
    descripcion: 'Una joven agente del FBI debe buscar la ayuda del brillante pero perturbado Dr. Hannibal Lecter para capturar a un peligroso asesino en serie.',
    imagen: 'https://image.tmdb.org/t/p/w500/uS9m8OBk1A8eM9I042bx8XXpqAq.jpg'
  },
  {
    id: 11,
    titulo: 'Toy Story',
    director: 'John Lasseter',
    anyo: 1995,
    genero: 'Animacion',
    puntuacion: 8.3,
    descripcion: 'Los juguetes de un nino cobran vida cuando no hay nadie en casa. Woody y Buzz Lightyear se convierten en rivales y luego en amigos inseparables.',
    imagen: 'https://image.tmdb.org/t/p/w500/uXDfjJbdP4ijW5hWSBrPl9KcertP.jpg'
  },
  {
    id: 12,
    titulo: 'Avengers: Endgame',
    director: 'Anthony Russo, Joe Russo',
    anyo: 2019,
    genero: 'Accion',
    puntuacion: 8.4,
    descripcion: 'Los Vengadores restantes deben encontrar una forma de revertir las acciones de Thanos y restaurar el equilibrio del universo antes de que sea demasiado tarde.',
    imagen: 'https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg'
  },
  {
    id: 13,
    titulo: 'Gladiador',
    director: 'Ridley Scott',
    anyo: 2000,
    genero: 'Accion',
    puntuacion: 8.5,
    descripcion: 'Un general romano traicionado por el hermano del emperador se convierte en gladiador y busca venganza contra el hombre que mato a su familia.',
    imagen: 'https://image.tmdb.org/t/p/w500/ty8TGRuvJLPUmAZ26MmeixqSt9K.jpg'
  },
  {
    id: 14,
    titulo: 'La Lista de Schindler',
    director: 'Steven Spielberg',
    anyo: 1993,
    genero: 'Drama',
    puntuacion: 9.0,
    descripcion: 'La historia de Oskar Schindler, un empresario aleman que salvo la vida de mas de mil refugiados judios durante el Holocausto.',
    imagen: 'https://image.tmdb.org/t/p/w500/sF1U4EUQS8YHUYjNl3pMGNIQyr0.jpg'
  },
  {
    id: 15,
    titulo: 'Oppenheimer',
    director: 'Christopher Nolan',
    anyo: 2023,
    genero: 'Drama',
    puntuacion: 8.6,
    descripcion: 'La historia del fisico teorico J. Robert Oppenheimer y su papel en el desarrollo de la primera bomba atomica durante la Segunda Guerra Mundial.',
    imagen: 'https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg'
  }
]
