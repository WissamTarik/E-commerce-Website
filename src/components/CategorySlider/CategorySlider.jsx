import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { RotatingLines } from 'react-loader-spinner'
import Slider from 'react-slick'

export default function CategorySlider() {
  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 1000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
 async function getAllCategories(){
     return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
  }
 let {data,isError,isLoading}= useQuery({
    queryKey:['Categories'],
    queryFn:getAllCategories,
    select:(data)=>{
      return data.data.data
    }
  })
  if(isLoading){
      return <div className='h-screen flex justify-center items-center'>
        <RotatingLines
    visible={true}
    height="96"
    width="96"
    color="grey"
    strokeWidth="5"
    animationDuration="0.75"
    ariaLabel="rotating-lines-loading"
    wrapperStyle={{}}
    wrapperClass=""
    />
      </div>
    }
    if(isError){
      return  <div className='h-screen flex justify-center items-center'>
        <h1 className='text-3xl text-red-600 font-bold'>Can't reload Categories</h1>
      </div>
    }
  return (
    <section id="categories" className='container mx-auto mb-10'>
     <div className='overflow-hidden pb-10'>
     <Slider {...settings}>
     
     {data?.map((category)=> <div key={category._id}>
      <img src={category.image} alt={category.name}  className='min-[481px]:h-72  h-96 object-cover'/>
     </div>)}
   
   </Slider>
    
     </div>
    
    </section>
  )
}
