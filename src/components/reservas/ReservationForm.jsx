import styles from './ReservationForm.module.css'

const ReservationForm = ({ formData, onChange, onSubmit, disabled }) => {
  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <div className={styles.grid}>
        <label className={styles.field}>
          Nombre completo
          <input
            className={styles.input}
            type='text'
            name='nombreCliente'
            value={formData.nombreCliente}
            onChange={onChange}
            placeholder='Tu nombre'
            required
            disabled={disabled}
          />
        </label>
        <label className={styles.field}>
          Correo electrónico
          <input
            className={styles.input}
            type='email'
            name='correoCliente'
            value={formData.correoCliente}
            onChange={onChange}
            placeholder='ejemplo@correo.com'
            required
            disabled={disabled}
          />
        </label>
        <label className={styles.field}>
          Teléfono
          <input
            className={styles.input}
            type='tel'
            name='telefonoCliente'
            value={formData.telefonoCliente}
            onChange={onChange}
            placeholder='11 1234 5678'
            required
            disabled={disabled}
          />
        </label>
        <label className={styles.fieldFull}>
          Observaciones
          <textarea
            className={styles.textarea}
            name='observaciones'
            value={formData.observaciones}
            onChange={onChange}
            placeholder='¿Algo que debamos saber?'
            rows='3'
            disabled={disabled}
          />
        </label>
      </div>

      <button className={styles.button} type='submit' disabled={disabled}>
        Confirmar reserva
      </button>
    </form>
  )
}

export default ReservationForm
