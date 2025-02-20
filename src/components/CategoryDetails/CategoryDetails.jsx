import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'
import { useState } from 'react'
import { Helmet } from 'react-helmet';
import { RotatingLines } from 'react-loader-spinner';
import { useParams } from 'react-router-dom'

export default function CategoryDetails() {
  const {id}=useParams()
  console.log(id);
  async function getSpecificCategory() {
        return await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`)
  }
  const {data,isLoading,isError}=useQuery({
    queryKey:['Category'],
    queryFn:getSpecificCategory,

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
      <h1 className='text-3xl text-red-600 font-bold'>This Category Are Not Found</h1>
    </div>
  }
  return (
    <section id={`${data?.name}`} className='py-14 mt-14 container mx-auto'>
      <Helmet>
    <title>{data? data.name: "Category"}</title>
  </Helmet>
           <div className="grid md:grid-cols-2 gap-y-5 items-center ">
             <div className='   '>
             <img src={data?.image} alt={data?.name} className='object-cover w-full  h-[500px] md:w-3/4 md:h-[100%] shadow-lg' />
             </div>            
             <div>
              <h1 className='text-3xl'>Category Name:<span className='text-green-600'>{data?.name}</span></h1>
              <h3 className='text-2xl font-semibold'>Slug Name :{data?.slug}</h3>
              <h6 className=' text-black/50 w-fit mt-3'>Created At: {data?.createdAt.split("T")[0].split('-').reverse().join('-')}</h6>

             </div>
           </div>
    </section>
  )
}
