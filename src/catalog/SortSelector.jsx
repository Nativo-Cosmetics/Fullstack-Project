import styles from './SortSelector.module.css'

const SortSelector = ({ value, onChange }) => {
  return (
    <div className={styles.sortWrapper}>
      <label htmlFor='sort-selection' className={styles.label}>
        Ordenar por
      </label>
      <select
        id='sort-selection'
        className={styles.select}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        <option value='priceAsc'>Menor precio</option>
        <option value='priceDesc'>Mayor precio</option>
        <option value='nameAsc'>A - Z</option>
        <option value='nameDesc'>Z - A</option>
      </select>
    </div>
  )
}

export default SortSelector
