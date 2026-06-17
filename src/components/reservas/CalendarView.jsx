import styles from './CalendarView.module.css'

const CalendarView = ({ selectedDate, onSelectDate, minDate }) => {
  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor='booking-date'>Fecha</label>
      <input
        id='booking-date'
        className={styles.input}
        type='date'
        value={selectedDate}
        min={minDate}
        onChange={(event) => onSelectDate(event.target.value)}
      />
    </div>
  )
}

export default CalendarView
