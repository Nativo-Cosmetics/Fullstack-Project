import styles from './ServiceSelector.module.css'

const ServiceSelector = ({ services, selectedServiceId, onSelectService }) => {
  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor='service-selector'>Servicio</label>
      <select
        id='service-selector'
        className={styles.select}
        value={selectedServiceId}
        onChange={(event) => onSelectService(event.target.value)}
      >
        <option value=''>Selecciona un servicio</option>
        {services.map((service) => (
          <option key={service._id} value={service._id}>
            {service.nombreServicio} · {service.duracionMinutos} min
          </option>
        ))}
      </select>
    </div>
  )
}

export default ServiceSelector
