import React from 'react'
import { useState } from 'react'
import mainSlider1 from "../../assets/images/mainSlider1.jpeg"
import mainSlider2 from "../../assets/images/mainSlider2.jpeg"
import smallMainSlider1 from "../../assets/images/smallMainSlider1_.jpg"
import smallMainSlider2 from "../../assets/images/smallMainSlider2.jpg"
import Slider from 'react-slick';
export default function MainSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <section id="mainSlider" className='container mx-auto py-10 mt-10'>
       <div className='grid xl:grid-cols-[2fr_1fr] gap-0 items-center'>
      <div className='overflow-hidden py-5'>
      <Slider {...settings}>
        <div>
          <img src={mainSlider1} alt="" className='' />
        </div>
        <div>
          <img src={mainSlider2} alt="" className='' />
        </div>
       </Slider>
      </div>
      <div className='hidden xl:block'>
        <div>
        <img src={smallMainSlider1} alt="" className='h-[278px] object-cover' />

        </div>
        <div>
        <img src={smallMainSlider2} alt="" className='h-[278px] object-cover' />
      </div>
      </div>
      
       </div>

    </section>
  )
}
