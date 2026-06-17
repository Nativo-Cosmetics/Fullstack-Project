import { useEffect, useState } from 'react'
import Navbar from '../components/navigation/navbar.jsx'
import Footer from '../components/navigation/footer.jsx'
import ServiceSelector from '../components/reservas/ServiceSelector.jsx'
import CalendarView from '../components/reservas/CalendarView.jsx'
import TimeSlotSelector from '../components/reservas/TimeSlotSelector.jsx'
import ReservationForm from '../components/reservas/ReservationForm.jsx'
import { fetchServicios, fetchDisponibilidad, createReserva } from '../components/reservas/api.js'
import styles from './ReservarPage.module.css'

const ReservarPage = () => {
  const [servicios, setServicios] = useState([])
  const [selectedServiceId, setSelectedServiceId] = useState('')
  const [selectedDate, setSelectedDate] = useState('')
  const [availableSlots, setAvailableSlots] = useState([])
  const [selectedTime, setSelectedTime] = useState('')
  const [formData, setFormData] = useState({
    nombreCliente: '',
    correoCliente: '',
    telefonoCliente: '',
    observaciones: '',
  })
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const today = new Date().toISOString().split('T')[0]

  useEffect(() => {
    const loadServicios = async () => {
      try {
        setLoading(true)
        const data = await fetchServicios()
        setServicios(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadServicios()
  }, [])

  const handleServiceChange = (serviceId) => {
    setSelectedServiceId(serviceId)
    setSelectedDate('')
    setAvailableSlots([])
    setSelectedTime('')
  }

  const handleDateChange = async (date) => {
    setSelectedDate(date)
    setSelectedTime('')
    setError('')

    if (!selectedServiceId || !date) {
      setAvailableSlots([])
      return
    }

    try {
      const slots = await fetchDisponibilidad({ servicioId: selectedServiceId, fecha: date })
      setAvailableSlots(slots)
    } catch (err) {
      setError(err.message)
      setAvailableSlots([])
    }
  }

  const handleFormChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setSubmitting(true)

    if (!selectedServiceId || !selectedDate || !selectedTime) {
      setError('Completa todos los campos de reserva.')
      setSubmitting(false)
      return
    }

    try {
      const payload = {
        servicioId: selectedServiceId,
        fecha: selectedDate,
        hora: selectedTime,
        nombreCliente: formData.nombreCliente,
        correoCliente: formData.correoCliente,
        telefonoCliente: formData.telefonoCliente,
        observaciones: formData.observaciones,
      }

      await createReserva(payload)
      setSuccess(true)
      setFormData({ nombreCliente: '', correoCliente: '', telefonoCliente: '', observaciones: '' })
      setSelectedServiceId('')
      setSelectedDate('')
      setSelectedTime('')
      setAvailableSlots([])

      setTimeout(() => {
        setSuccess(false)
      }, 5000)
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <Navbar />
      <main className={styles.page}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h1 className={styles.title}>Agendar Hora</h1>
            <p className={styles.subtitle}>Reserva tu servicio en nuestra peluquería</p>
          </div>

          {loading && <p className={styles.status}>Cargando servicios...</p>}

          {!loading && (
            <div className={styles.content}>
              <section className={styles.formSection}>
                <div className={styles.step}>
                  <h2 className={styles.stepTitle}>1. Selecciona un servicio</h2>
                  <ServiceSelector
                    services={servicios}
                    selectedServiceId={selectedServiceId}
                    onSelectService={handleServiceChange}
                  />
                </div>

                {selectedServiceId && (
                  <>
                    <div className={styles.step}>
                      <h2 className={styles.stepTitle}>2. Elige una fecha</h2>
                      <CalendarView
                        selectedDate={selectedDate}
                        onSelectDate={handleDateChange}
                        minDate={today}
                      />
                    </div>

                    {selectedDate && (
                      <div className={styles.step}>
                        <h2 className={styles.stepTitle}>3. Selecciona un horario</h2>
                        <TimeSlotSelector
                          slots={availableSlots}
                          selectedTime={selectedTime}
                          onSelectTime={setSelectedTime}
                        />
                      </div>
                    )}

                    {selectedTime && (
                      <div className={styles.step}>
                        <h2 className={styles.stepTitle}>4. Completa tus datos</h2>
                        <ReservationForm
                          formData={formData}
                          onChange={handleFormChange}
                          onSubmit={handleSubmit}
                          disabled={submitting}
                        />
                      </div>
                    )}
                  </>
                )}
              </section>

              {error && <div className={styles.errorBanner}>{error}</div>}
              {success && <div className={styles.successBanner}>¡Reserva confirmada! Revisa tu correo electrónico.</div>}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}

export default ReservarPage
