// Configuracion e inicializacion de Firebase
// Todos los accesos a Firebase pasan por este fichero
// Autor: Pablo Tapia Manchado
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyD5kbia8PiFMHS4mn_mzlpmJfm3gl6bY0c',
  authDomain: 'cinelog-80cad.firebaseapp.com',
  projectId: 'cinelog-80cad',
  storageBucket: 'cinelog-80cad.firebasestorage.app',
  messagingSenderId: '784147865783',
  appId: '1:784147865783:web:601c60d2af9d46eb946d32'
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
