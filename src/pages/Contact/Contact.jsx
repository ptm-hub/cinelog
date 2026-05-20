// Pagina de contacto con formulario y mapa de Leaflet
// Autor: Pablo Tapia Manchado
import { useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Icon } from 'leaflet'
import markerIconPng from 'leaflet/dist/images/marker-icon.png'
import markerShadowPng from 'leaflet/dist/images/marker-shadow.png'
import 'leaflet/dist/leaflet.css'
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import './Contact.css'

// Coordenadas de la Puerta del Sol en Madrid
const LOCATION_LAT = 40.4167754
const LOCATION_LNG = -3.7037902

// Icono personalizado del marcador de Leaflet para que funcione bien con Vite
const customMarker = new Icon({
  iconUrl: markerIconPng,
  shadowUrl: markerShadowPng,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34]
})

// Estado inicial del formulario de contacto
const emptyContactForm = {
  nombre: '',
  email: '',
  asunto: '',
  mensaje: ''
}

function Contact() {
  const [formData, setFormData] = useState(emptyContactForm)
  const [isSent, setIsSent] = useState(false)

  function handleChange(event) {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
  }

  // Simula el envio del formulario ya que no hay backend real
  function handleSubmit(event) {
    event.preventDefault()
    setIsSent(true)
    setFormData(emptyContactForm)
    setTimeout(() => setIsSent(false), 5000)
  }

  return (
    <>
      <Header />

      <main className="contact">
        <div className="contact__container">

          <div className="contact__header">
            <h1 className="contact__title">Contacto</h1>
            <p className="contact__subtitle">
              Tienes alguna pregunta o sugerencia? Escribenos y te responderemos lo antes posible.
            </p>
          </div>

          <div className="contact__content">

            {/* Columna de datos de contacto */}
            <div className="contact__info">
              <h2 className="contact__info-title">Nuestra Informacion</h2>

              <div className="contact__info-item">
                <div className="contact__info-icon">
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <strong>Direccion</strong>
                  <p>Puerta del Sol, 1<br />28013 Madrid, Espana</p>
                </div>
              </div>

              <div className="contact__info-item">
                <div className="contact__info-icon">
                  <FaPhone />
                </div>
                <div>
                  <strong>Telefono</strong>
                  <p>+34 91 234 56 78</p>
                </div>
              </div>

              <div className="contact__info-item">
                <div className="contact__info-icon">
                  <FaEnvelope />
                </div>
                <div>
                  <strong>Email</strong>
                  <p>contacto@cinelog.es</p>
                </div>
              </div>

              <div className="contact__info-item">
                <div className="contact__info-icon">
                  <FaClock />
                </div>
                <div>
                  <strong>Horario de atencion</strong>
                  <p>Lunes a Viernes: 9:00 - 18:00<br />Fines de semana: cerrado</p>
                </div>
              </div>

              {/* Mapa de Leaflet con la ubicacion de la empresa */}
              <div className="contact__map">
                <MapContainer
                  center={[LOCATION_LAT, LOCATION_LNG]}
                  zoom={15}
                  style={{ height: '260px', width: '100%', borderRadius: '10px' }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  />
                  <Marker position={[LOCATION_LAT, LOCATION_LNG]} icon={customMarker}>
                    <Popup>
                      <strong>CineLog HQ</strong><br />
                      Puerta del Sol, Madrid
                    </Popup>
                  </Marker>
                </MapContainer>
              </div>
            </div>

            {/* Columna del formulario de contacto */}
            <div className="contact__form-wrapper">
              <h2 className="contact__info-title">Envianos un Mensaje</h2>

              {isSent && (
                <div className="contact__success">
                  Mensaje enviado correctamente. Te contestaremos en breve.
                </div>
              )}

              <form onSubmit={handleSubmit} className="contact__form">
                <div className="contact__form-row">
                  <div className="contact__form-group">
                    <label className="contact__label">Nombre completo *</label>
                    <input
                      type="text"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      required
                      className="contact__input"
                      placeholder="Tu nombre"
                    />
                  </div>
                  <div className="contact__form-group">
                    <label className="contact__label">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="contact__input"
                      placeholder="tu@email.com"
                    />
                  </div>
                </div>

                <div className="contact__form-group">
                  <label className="contact__label">Asunto *</label>
                  <input
                    type="text"
                    name="asunto"
                    value={formData.asunto}
                    onChange={handleChange}
                    required
                    className="contact__input"
                    placeholder="De que trata tu mensaje"
                  />
                </div>

                <div className="contact__form-group">
                  <label className="contact__label">Mensaje *</label>
                  <textarea
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleChange}
                    required
                    rows="6"
                    className="contact__textarea"
                    placeholder="Escribe aqui tu mensaje..."
                  />
                </div>

                <button type="submit" className="contact__btn-submit">
                  Enviar Mensaje
                </button>
              </form>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}

export default Contact
