import React from 'react'
import Star from '../../assets/icons/star.svg'
import Default from '../../assets/img/default_user.jpg'

import './sections.css'

const reviews = [
  {
    id: 1,
    name: 'María López',
    text: 'Me encanta la textura y el aroma. El envío llegó rápido y la presentación es preciosa.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Ana García',
    text: 'Productos naturales y fáciles de usar. Mi piel se ve más hidratada desde la primera semana.',
    rating: 4,
  },
  {
    id: 3,
    name: 'Sofía Martínez',
    text: 'Recomiendo Nativo Cosmetics por su calidad y atención al cliente. Definitivamente volveré a comprar.',
    rating: 4.5,
  },
]

const Reviews = () => {
  return (
    <section className='reviews-section'>
      <div className='reviews-header'>
        <h2>Reseñas de clientes</h2>
        <p>Escucha lo que dicen quienes ya probaron nuestros productos.</p>
      </div>

      <div className='reviews-grid'>
        {reviews.map((review) => (
          <article key={review.id} className='review-card'>
            <div className='review-avatar'>
              <img src={Default} alt={review.name} />
            </div>
            <div className='review-content'>
              <h3 className='review-name'>{review.name}</h3>
              <p className='review-text'>{review.text}</p>
              <div className='review-stars'>
                <img src={Star} alt='Estrella' className='star-icon' />
                <span className='star-rating'>{review.rating}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Reviews
