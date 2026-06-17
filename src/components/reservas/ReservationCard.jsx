import styles from './ReservationCard.module.css'

const ReservationCard = ({ reservation, onReschedule, onCancel }) => {
  const fecha = new Date(reservation.fecha).toLocaleDateString('es-AR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })

  const isCancellable = reservation.estado !== 'Cancelada'
  return (
    <article className={styles.card}>
      <div className={styles.summary}>
        <span className={styles.status}>{reservation.estado}</span>
        <h3 className={styles.serviceName}>{reservation.servicioId?.nombreServicio || 'Servicio'}</h3>
        <p className={styles.details}>{fecha} · {reservation.hora}</p>
      </div>
      <div className={styles.meta}>
        <p>{reservation.nombreCliente}</p>
        <p>{reservation.correoCliente}</p>
        <p>{reservation.telefonoCliente}</p>
      </div>
      <div className={styles.actions}>
        <button type='button' className={styles.actionButton} onClick={() => onReschedule(reservation)} disabled={!isCancellable}>
          Reprogramar
        </button>
        <button type='button' className={styles.cancelButton} onClick={() => onCancel(reservation)} disabled={!isCancellable}>
          Cancelar
        </button>
      </div>
    </article>
  )
}

export default ReservationCard
