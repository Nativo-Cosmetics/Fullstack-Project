import styles from './PriceRangeFilter.module.css'

const PriceRangeFilter = ({ minValue, maxValue, bounds, onChange }) => {
  const handleMinChange = (value) => {
    const newMin = Number(value)
    if (newMin <= maxValue) {
      onChange(newMin, maxValue)
    }
  }

  const handleMaxChange = (value) => {
    const newMax = Number(value)
    if (newMax >= minValue) {
      onChange(minValue, newMax)
    }
  }

  const minBound = bounds.min ?? 0
  const maxBound = bounds.max ?? 0

  return (
    <div className={styles.rangeFilter}>
      <div className={styles.inputsRow}>
        <label className={styles.label}>
          Mínimo
          <input
            type='number'
            value={minValue}
            min={minBound}
            max={maxValue}
            onChange={(event) => handleMinChange(event.target.value)}
            className={styles.input}
          />
        </label>
        <label className={styles.label}>
          Máximo
          <input
            type='number'
            value={maxValue}
            min={minValue}
            max={maxBound}
            onChange={(event) => handleMaxChange(event.target.value)}
            className={styles.input}
          />
        </label>
      </div>
      <div className={styles.sliders}>
        <input
          type='range'
          min={minBound}
          max={maxBound}
          value={minValue}
          onChange={(event) => handleMinChange(event.target.value)}
          className={styles.slider}
        />
        <input
          type='range'
          min={minBound}
          max={maxBound}
          value={maxValue}
          onChange={(event) => handleMaxChange(event.target.value)}
          className={styles.slider}
        />
      </div>
      <p className={styles.priceRange}>
        Rango: {minValue} - {maxValue}
      </p>
    </div>
  )
}

export default PriceRangeFilter
