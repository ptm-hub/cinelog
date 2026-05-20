// Servicio centralizado para todas las operaciones con Firebase Firestore
// Todas las paginas y componentes deben usar estas funciones para acceder a los datos
// Autor: Pablo Tapia Manchado
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  writeBatch
} from 'firebase/firestore'
import { db } from './firebase-config'

// Nombre de la coleccion en Firestore
const COLLECTION = 'peliculas'

// Lee todas las peliculas de Firestore
export async function getMovies() {
  const snapshot = await getDocs(collection(db, COLLECTION))
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() }))
}

// Añade una nueva pelicula a Firestore y devuelve el objeto con el id generado
export async function addMovie(movieData) {
  const { id, ...data } = movieData
  const docRef = await addDoc(collection(db, COLLECTION), data)
  return { id: docRef.id, ...data }
}

// Actualiza los datos de una pelicula existente en Firestore
export async function updateMovie(movieId, movieData) {
  const { id, ...data } = movieData
  await updateDoc(doc(db, COLLECTION, movieId), data)
}

// Elimina una pelicula de Firestore por su id
export async function deleteMovie(movieId) {
  await deleteDoc(doc(db, COLLECTION, movieId))
}

// Importa un array de peliculas a Firestore usando escritura en lote para mayor eficiencia
export async function importMovies(movies) {
  const batch = writeBatch(db)
  movies.forEach(movie => {
    const { id, ...data } = movie
    const ref = doc(collection(db, COLLECTION))
    batch.set(ref, data)
  })
  await batch.commit()
}

// Elimina todas las peliculas de Firestore (util para limpiar antes de importar)
export async function deleteAllMovies() {
  const snapshot = await getDocs(collection(db, COLLECTION))
  const batch = writeBatch(db)
  snapshot.docs.forEach(d => batch.delete(d.ref))
  await batch.commit()
}
