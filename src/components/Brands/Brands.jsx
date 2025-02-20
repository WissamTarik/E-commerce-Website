import { useQueries, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { Helmet } from 'react-helmet';
import { RotatingLines } from 'react-loader-spinner';

export default function Brands() {
  async function getBrands() {
  return await axios.get('https://ecommerce.routemisr.com/api/v1/brands')
    
  }
  const {isLoading,data,isError}=useQuery({
    queryKey:['Brands'],
    queryFn:getBrands,
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
            <Helmet>
      <title> Brands</title>
    </Helmet>
    </div>
  }
  if(isError){
    return  <div className='h-screen flex justify-center items-center'>
                <Helmet>
      <title> Brands</title>
    </Helmet>
      <h1 className='text-3xl text-red-600 font-bold'>Can't reload the brands</h1>
    </div>
  }
  return (
    <section id="brands " className=' container mx-auto py-10 mt-10'>
          <Helmet>
      <title> Brands</title>
    </Helmet>
          <h1 className='text-green-600 text-center my-3 text-5xl mb-8 font-semibold'>All Brands</h1>
         <div className='grid lg:grid-cols-7 md:grid-cols-5 sm:grid-cols-3 gap-4 '>
           {data?.map((brand)=>{return <div key={brand._id} className='border border-green-600 rounded-lg hover:shadow hover:shadow-green-600 transition-all duration-300 hover:-translate-y-1'>
            <img src={brand.image} alt={brand.name} />
           </div>})}

         </div>

    </section>
  )
}
