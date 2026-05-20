// Pagina para importar y exportar datos del catalogo en JSON, CSV y XML
// Los datos se leen y escriben en Firebase Firestore a traves del servicio centralizado
import { useState } from 'react'
import { FaDownload, FaUpload, FaFileAlt, FaFileCsv, FaFileCode } from 'react-icons/fa'
import Papa from 'papaparse'
import { XMLParser, XMLBuilder } from 'fast-xml-parser'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import { getMovies, importMovies, deleteAllMovies } from '../../services/movies-service'
import './ImportExport.css'

function ImportExport() {
  const [isLoading, setIsLoading] = useState(false)
  const [statusMessage, setStatusMessage] = useState('')
  const [hasError, setHasError] = useState(false)

  // Muestra un mensaje de estado durante 4 segundos
  function showStatus(message, isError = false) {
    setStatusMessage(message)
    setHasError(isError)
    setTimeout(() => setStatusMessage(''), 4000)
  }

  // Descarga un fichero en el navegador del usuario
  function downloadFile(content, fileName, mimeType) {
    const blob = new Blob([content], { type: mimeType })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = fileName
    link.click()
    URL.revokeObjectURL(url)
  }

  // Lee el contenido de un fichero subido por el usuario
  function readFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = e => resolve(e.target.result)
      reader.onerror = reject
      reader.readAsText(file)
    })
  }

  // Exporta los datos de Firebase a un fichero JSON
  async function handleExportJSON() {
    try {
      setIsLoading(true)
      const movies = await getMovies()
      const cleanMovies = movies.map(({ id, ...rest }) => rest)
      const jsonContent = JSON.stringify(cleanMovies, null, 2)
      downloadFile(jsonContent, 'datos.json', 'application/json')
      showStatus('Archivo datos.json exportado correctamente.')
    } catch (error) {
      showStatus('Error al exportar JSON. Intentalo de nuevo.', true)
    } finally {
      setIsLoading(false)
    }
  }

  // Importa un fichero JSON y guarda los datos en Firebase
  async function handleImportJSON(event) {
    const file = event.target.files[0]
    if (!file) return
    try {
      setIsLoading(true)
      const content = await readFile(file)
      const movies = JSON.parse(content)
      if (!Array.isArray(movies)) throw new Error('El fichero no contiene un array valido.')
      await importMovies(movies)
      showStatus(`${movies.length} peliculas importadas correctamente desde JSON.`)
    } catch (error) {
      showStatus('Error al importar JSON. Comprueba que el formato sea correcto.', true)
    } finally {
      setIsLoading(false)
      event.target.value = ''
    }
  }

  // Exporta los datos de Firebase a un fichero CSV
  async function handleExportCSV() {
    try {
      setIsLoading(true)
      const movies = await getMovies()
      const cleanMovies = movies.map(({ id, ...rest }) => rest)
      const csvContent = Papa.unparse(cleanMovies)
      downloadFile(csvContent, 'datos.csv', 'text/csv')
      showStatus('Archivo datos.csv exportado correctamente.')
    } catch (error) {
      showStatus('Error al exportar CSV. Intentalo de nuevo.', true)
    } finally {
      setIsLoading(false)
    }
  }

  // Importa un fichero CSV y guarda los datos en Firebase
  async function handleImportCSV(event) {
    const file = event.target.files[0]
    if (!file) return
    try {
      setIsLoading(true)
      const content = await readFile(file)
      const result = Papa.parse(content, { header: true, skipEmptyLines: true })
      const movies = result.data.map(row => ({
        ...row,
        anyo: Number(row.anyo),
        puntuacion: Number(row.puntuacion)
      }))
      await importMovies(movies)
      showStatus(`${movies.length} peliculas importadas correctamente desde CSV.`)
    } catch (error) {
      showStatus('Error al importar CSV. Comprueba que el formato sea correcto.', true)
    } finally {
      setIsLoading(false)
      event.target.value = ''
    }
  }

  // Exporta los datos de Firebase a un fichero XML
  async function handleExportXML() {
    try {
      setIsLoading(true)
      const movies = await getMovies()
      const cleanMovies = movies.map(({ id, ...rest }) => rest)
      const builder = new XMLBuilder({ arrayNodeName: 'pelicula', format: true })
      const xmlBody = builder.build({ peliculas: { pelicula: cleanMovies } })
      const xmlContent = '<?xml version="1.0" encoding="UTF-8"?>\n' + xmlBody
      downloadFile(xmlContent, 'datos.xml', 'application/xml')
      showStatus('Archivo datos.xml exportado correctamente.')
    } catch (error) {
      showStatus('Error al exportar XML. Intentalo de nuevo.', true)
    } finally {
      setIsLoading(false)
    }
  }

  // Importa un fichero XML y guarda los datos en Firebase
  async function handleImportXML(event) {
    const file = event.target.files[0]
    if (!file) return
    try {
      setIsLoading(true)
      const content = await readFile(file)
      const parser = new XMLParser()
      const parsed = parser.parse(content)
      let peliculas = parsed.peliculas.pelicula
      // Si solo hay una pelicula el parser devuelve un objeto en vez de un array
      if (!Array.isArray(peliculas)) peliculas = [peliculas]
      const movies = peliculas.map(p => ({
        ...p,
        anyo: Number(p.anyo),
        puntuacion: Number(p.puntuacion)
      }))
      await importMovies(movies)
      showStatus(`${movies.length} peliculas importadas correctamente desde XML.`)
    } catch (error) {
      showStatus('Error al importar XML. Comprueba que el formato sea correcto.', true)
    } finally {
      setIsLoading(false)
      event.target.value = ''
    }
  }

  // Elimina todos los datos de Firebase (para empezar desde cero antes de importar)
  async function handleDeleteAll() {
    if (window.confirm('¿Estas seguro? Se eliminaran todas las peliculas de Firebase.')) {
      try {
        setIsLoading(true)
        await deleteAllMovies()
        showStatus('Todos los datos han sido eliminados de Firebase.')
      } catch (error) {
        showStatus('Error al eliminar los datos.', true)
      } finally {
        setIsLoading(false)
      }
    }
  }

  return (
    <>
      <Header />

      <main className="import-export">
        <div className="import-export__container">

          <div className="import-export__header">
            <h1 className="import-export__title">Importar y Exportar Datos</h1>
            <p className="import-export__subtitle">
              Gestiona los datos del catalogo importando o exportando en JSON, CSV o XML.
              Todos los datos se almacenan en Firebase Firestore.
            </p>
          </div>

          {statusMessage && (
            <div className={`import-export__status ${hasError ? 'import-export__status--error' : 'import-export__status--ok'}`}>
              {statusMessage}
            </div>
          )}

          {isLoading && (
            <div className="import-export__loading">
              <div className="import-export__spinner"></div>
              <p>Procesando...</p>
            </div>
          )}

          <div className="import-export__grid">

            {/* Tarjeta JSON */}
            <div className="import-export__card">
              <div className="import-export__card-header">
                <FaFileAlt className="import-export__icon import-export__icon--json" />
                <h2 className="import-export__card-title">JSON</h2>
              </div>
              <p className="import-export__card-desc">
                Formato ligero muy usado en aplicaciones web. Facil de leer y editar con cualquier editor de texto.
              </p>
              <div className="import-export__actions">
                <a href="/datos.json" download className="import-export__btn import-export__btn--sample">
                  <FaDownload /> Descargar ejemplo
                </a>
                <button
                  className="import-export__btn import-export__btn--export"
                  onClick={handleExportJSON}
                  disabled={isLoading}
                >
                  <FaDownload /> Exportar datos
                </button>
                <label className="import-export__btn import-export__btn--import">
                  <FaUpload /> Importar fichero
                  <input type="file" accept=".json" onChange={handleImportJSON} hidden />
                </label>
              </div>
            </div>

            {/* Tarjeta CSV */}
            <div className="import-export__card">
              <div className="import-export__card-header">
                <FaFileCsv className="import-export__icon import-export__icon--csv" />
                <h2 className="import-export__card-title">CSV</h2>
              </div>
              <p className="import-export__card-desc">
                Valores separados por comas. Compatible con Microsoft Excel y Google Sheets para edicion masiva.
              </p>
              <div className="import-export__actions">
                <a href="/datos.csv" download className="import-export__btn import-export__btn--sample">
                  <FaDownload /> Descargar ejemplo
                </a>
                <button
                  className="import-export__btn import-export__btn--export"
                  onClick={handleExportCSV}
                  disabled={isLoading}
                >
                  <FaDownload /> Exportar datos
                </button>
                <label className="import-export__btn import-export__btn--import">
                  <FaUpload /> Importar fichero
                  <input type="file" accept=".csv" onChange={handleImportCSV} hidden />
                </label>
              </div>
            </div>

            {/* Tarjeta XML */}
            <div className="import-export__card">
              <div className="import-export__card-header">
                <FaFileCode className="import-export__icon import-export__icon--xml" />
                <h2 className="import-export__card-title">XML</h2>
              </div>
              <p className="import-export__card-desc">
                Lenguaje de marcado extensible. Muy usado en sistemas empresariales e integraciones entre aplicaciones.
              </p>
              <div className="import-export__actions">
                <a href="/datos.xml" download className="import-export__btn import-export__btn--sample">
                  <FaDownload /> Descargar ejemplo
                </a>
                <button
                  className="import-export__btn import-export__btn--export"
                  onClick={handleExportXML}
                  disabled={isLoading}
                >
                  <FaDownload /> Exportar datos
                </button>
                <label className="import-export__btn import-export__btn--import">
                  <FaUpload /> Importar fichero
                  <input type="file" accept=".xml" onChange={handleImportXML} hidden />
                </label>
              </div>
            </div>

          </div>

          <div className="import-export__danger">
            <h3 className="import-export__danger-title">Zona de peligro</h3>
            <p className="import-export__danger-desc">
              Esta accion elimina todos los datos de Firebase de forma permanente. Usala antes de importar datos nuevos para evitar duplicados.
            </p>
            <button
              className="import-export__btn import-export__btn--delete"
              onClick={handleDeleteAll}
              disabled={isLoading}
            >
              Eliminar todos los datos de Firebase
            </button>
          </div>

        </div>
      </main>

      <Footer />
    </>
  )
}

export default ImportExport
