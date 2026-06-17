import ReservationCard from './ReservationCard.jsx'
import styles from './ReservationList.module.css'

const ReservationList = ({ reservations, onReschedule, onCancel }) => {
  if (reservations.length === 0) {
    return <p className={styles.empty}>Aún no tienes reservas registradas.</p>
  }

  return (
    <div className={styles.list}>
      {reservations.map((reservation) => (
        <ReservationCard
          key={reservation._id}
          reservation={reservation}
          onReschedule={onReschedule}
          onCancel={onCancel}
        />
      ))}
    </div>
  )
}

export default ReservationList
