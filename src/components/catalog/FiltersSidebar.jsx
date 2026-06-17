import PriceRangeFilter from './PriceRangeFilter.jsx'
import styles from './FiltersSidebar.module.css'

const FiltersSidebar = ({
  categories,
  currentCategory,
  minPrice,
  maxPrice,
  bounds,
  onCategoryChange,
  onPriceChange,
  onClearFilters,
}) => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.panel}>
        <h3 className={styles.title}>Categorías</h3>
        <ul className={styles.list}>
          <li
            className={`${styles.item} ${currentCategory === '' ? styles.active : ''}`}
            onClick={() => onCategoryChange('')}
          >
            Todas
          </li>
          {categories.map((category) => (
            <li
              key={category}
              className={`${styles.item} ${currentCategory === category ? styles.active : ''}`}
              onClick={() => onCategoryChange(category)}
            >
              {category}
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.panel}>
        <h3 className={styles.title}>Precio</h3>
        <PriceRangeFilter
          minValue={minPrice}
          maxValue={maxPrice}
          bounds={bounds}
          onChange={onPriceChange}
        />
      </div>

      <button type='button' className={styles.resetButton} onClick={onClearFilters}>
        Limpiar filtros
      </button>
    </aside>
  )
}

export default FiltersSidebar
