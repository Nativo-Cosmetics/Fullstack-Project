import { useEffect, useState } from 'react'
import Navbar from '../components/navigation/navbar.jsx'
import Footer from '../components/navigation/footer.jsx'
import ReservationList from '../components/reservas/ReservationList.jsx'
import { fetchReservas, updateReserva } from '../components/reservas/api.js'
import styles from './MisReservasPage.module.css'

const MisReservasPage = () => {
  const [reservations, setReservations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [rescheduleId, setRescheduleId] = useState(null)
  const [cancelId, setCancelId] = useState(null)
  const [processMessage, setProcessMessage] = useState('')

  useEffect(() => {
    loadReservations()
  }, [])

  const loadReservations = async () => {
    try {
      setLoading(true)
      const data = await fetchReservas()
      setReservations(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleReschedule = (reservation) => {
    const now = new Date()
    const reservationDateTime = new Date(reservation.fecha)
    const [hours, minutes] = reservation.hora.split(':').map(Number)
    reservationDateTime.setHours(hours, minutes, 0, 0)

    const canReschedule = reservationDateTime.getTime() - now.getTime() > 2 * 60 * 60 * 1000

    if (!canReschedule) {
      setProcessMessage('No se puede reprogramar la reserva dentro de las 2 horas previas.')
      setTimeout(() => setProcessMessage(''), 3000)
      return
    }

    setRescheduleId(reservation._id)
  }

  const handleCancel = async (reservation) => {
    const now = new Date()
    const reservationDateTime = new Date(reservation.fecha)
    const [hours, minutes] = reservation.hora.split(':').map(Number)
    reservationDateTime.setHours(hours, minutes, 0, 0)

    const canCancel = reservationDateTime.getTime() - now.getTime() > 1 * 60 * 60 * 1000

    if (!canCancel) {
      setProcessMessage('No se puede cancelar la reserva dentro de la última hora.')
      setTimeout(() => setProcessMessage(''), 3000)
      return
    }

    if (window.confirm('¿Deseas cancelar esta reserva?')) {
      try {
        await updateReserva(reservation._id, { estado: 'Cancelada' })
        setProcessMessage('Reserva cancelada exitosamente.')
        await loadReservations()
        setTimeout(() => setProcessMessage(''), 3000)
      } catch (err) {
        setProcessMessage(err.message)
        setTimeout(() => setProcessMessage(''), 5000)
      }
    }
  }

  return (
    <>
      <Navbar />
      <main className={styles.page}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h1 className={styles.title}>Mis Reservas</h1>
            <p className={styles.subtitle}>Administra tus citas agendadas</p>
          </div>

          {loading && <p className={styles.status}>Cargando tus reservas...</p>}

          {!loading && (
            <div className={styles.content}>
              <ReservationList
                reservations={reservations}
                onReschedule={handleReschedule}
                onCancel={handleCancel}
              />

              {error && <div className={styles.errorBanner}>{error}</div>}
              {processMessage && <div className={styles.infoBanner}>{processMessage}</div>}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}

export default MisReservasPage
