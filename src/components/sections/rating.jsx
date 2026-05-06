import React from 'react'
import Star from '../../assets/icons/star.svg'
import Default from '../../assets/img/default_user.jpg'

import './sections.css'

const Rating = () => {
    return (
        <div className='preview-review-container'>

            <h3 className='reviewsTitle'>Algunas reseñas!</h3>
            {/*  AGAIN
        this shit is only a preview, we need to change it to a 
        map function to load user info!
      */}

            <div className="reviewCard">
                <div className="userPfp-container">
                    <img src={Default} alt="" className='userpfp img' />
                </div>
                <div className="resume">
                    <h3 className='username'>
                        La Forma
                    </h3>
                    <span className='description'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Deserunt dolores labore totam accusamus doloremque quia
                        fugiat quasi hic vero quaerat.
                    </span>
                    <div className="rating">
                        <div className="star-icon">
                            <img src={Star} alt="" className='starImg icon' />
                        </div>
                        <div className="star-count">2</div>
                    </div>
                </div>

            </div>

            <div className="reviewCard">
                <div className="userPfp-container">
                    <img src={Default} alt="" className='userpfp img' />
                </div>
                <div className="resume">
                    <h3 className='username'>
                        Nancy Wheeler
                    </h3>
                    <span className='description'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Deserunt dolores labore totam accusamus doloremque quia
                        fugiat quasi hic vero quaerat.
                    </span>
                    <div className="rating">
                        <div className="star-icon">
                            <img src={Star} alt="" className='starImg icon' />
                        </div>
                        <div className="star-count">4</div>
                    </div>
                </div>

            </div>

            <div className="reviewCard">
                <div className="userPfp-container">
                    <img src={Default} alt="" className='userpfp img' />
                </div>
                <div className="resume">
                    <h3 className='username'>
                        Sable Ward
                    </h3>
                    <span className='description'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Deserunt dolores labore totam accusamus doloremque quia
                        fugiat quasi hic vero quaerat.
                    </span>
                    <div className="rating">
                        <div className="star-icon">
                            <img src={Star} alt="" className='starImg icon' />
                        </div>
                        <div className="star-count">4.5</div>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Rating
