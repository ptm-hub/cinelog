// Componente raiz de la aplicacion con las rutas principales
// Autor: Pablo Tapia Manchado
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Catalog from './pages/Catalog/Catalog'
import News from './pages/News/News'
import Contact from './pages/Contact/Contact'
import ImportExport from './pages/ImportExport/ImportExport'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/catalogo" element={<Catalog />} />
        <Route path="/noticias" element={<News />} />
        <Route path="/contacto" element={<Contact />} />
        <Route path="/importar-exportar" element={<ImportExport />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
