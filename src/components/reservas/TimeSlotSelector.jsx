import styles from './TimeSlotSelector.module.css'

const TimeSlotSelector = ({ slots, selectedTime, onSelectTime }) => {
  return (
    <div className={styles.container}>
      <p className={styles.label}>Horarios disponibles</p>
      {slots.length === 0 ? (
        <div className={styles.empty}>No hay disponibilidad para la fecha seleccionada.</div>
      ) : (
        <div className={styles.grid}>
          {slots.map((slot) => (
            <button
              key={slot._id}
              type='button'
              className={`${styles.slotButton} ${selectedTime === slot.hora ? styles.selected : ''}`}
              onClick={() => onSelectTime(slot.hora)}
            >
              {slot.hora}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default TimeSlotSelector
