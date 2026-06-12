import React from 'react'

import './heroSection.css'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
// Swiper modules
import 'swiper/css'
import 'swiper/css/pagination'

// Import Slides
import Slide2 from '../../assets/img/heroSlider/slide2.jpg'
import Slide1 from '../../assets/img/heroSlider/silde1.jpg'

const Hero = () => {
  return (
    <>
      <Swiper className='swiper'
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{
            delay: 3000,
            disableOnInteraction: false
        }}

        pagination={{
            clickable: true
        }}

        modules={[Autoplay, Pagination]}
        >
        <SwiperSlide className='swiper-slide'>
            <img src={Slide1} alt='slide1' className='slide-image' />
        </SwiperSlide>
        <SwiperSlide className='swiper-slide'>
            <img src={Slide2} alt='slide2' className='slide-image' />
        </SwiperSlide>
      </Swiper>
    </>
  )
}

export default Hero
