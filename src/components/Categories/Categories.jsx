import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { Helmet } from 'react-helmet'
import { RotatingLines } from 'react-loader-spinner'
import { Link } from 'react-router-dom'

export default function Categories() {

  async function getCategories() {
         return await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
  }
 const {isLoading,isError,data}= useQuery({
           queryKey:['Categories'],
           queryFn:getCategories,
           select:(data)=>{
            return data.data.data
           }
  })
    if(isLoading){
      return <div className='h-screen flex justify-center items-center'>
        <Helmet>
    <title>Categories</title>
  </Helmet>
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
        <Helmet>
    <title>Categories</title>
  </Helmet>
        <h1 className='text-3xl text-red-600 font-bold'>Can't reload our categories</h1>
      </div>
    }
  return (
    <section id='categories' className='mb-4 mt-14 pt-14'  >
      <Helmet>
    <title>Categories</title>
  </Helmet>
          <div className='grid md:grid-cols-3 sm:grid-cols-2 gap-4 container mx-auto'>
            {data?.map((category)=>

<Link to={`/categoryDetails/${category._id}`} key={category._id} className=" hover:shadow-lg translate-y-0 hover:-translate-y-2 cursor-pointer hover:shadow-green-600 transition-all duration-500 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
  <img className="rounded-t-lg w-full h-[350px] object-cover" src={category.image} alt={category.name} />
  <div className="p-5">
    <h5 className="mb-2 text-3xl text-center font-semibold tracking-tight text-green-600 dark:text-white">{category.name}</h5>
  </div>
</Link>

)}
          </div>


    </section>
  )
}
