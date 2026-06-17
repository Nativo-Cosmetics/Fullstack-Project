import styles from './Pagination.module.css'

const Pagination = ({ currentPage, totalPages, onChangePage }) => {
  if (totalPages <= 1) {
    return null
  }

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1)

  return (
    <div className={styles.pagination}>
      {pages.map((page) => (
        <button
          key={page}
          type='button'
          className={`${styles.pageButton} ${currentPage === page ? styles.active : ''}`}
          onClick={() => onChangePage(page)}
          disabled={currentPage === page}
        >
          {page}
        </button>
      ))}
    </div>
  )
}

export default Pagination
