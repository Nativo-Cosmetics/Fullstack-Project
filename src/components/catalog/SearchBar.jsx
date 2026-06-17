import styles from './SearchBar.module.css'

const SearchBar = ({ value, onChange }) => {
  return (
    <div className={styles.searchBar}>
      <label htmlFor='catalog-search' className={styles.searchLabel}>
        Buscar producto
      </label>
      <input
        id='catalog-search'
        type='text'
        className={styles.searchInput}
        placeholder='Buscar Shampoo, Jabón, Cremas...'
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  )
}

export default SearchBar
