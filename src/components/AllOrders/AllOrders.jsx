import React from 'react'
import { useState } from 'react'
import { jwtDecode } from "jwt-decode";
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { RotatingLines } from 'react-loader-spinner';
import { Helmet } from 'react-helmet';


export default function AllOrders() {
  const {id} = jwtDecode(localStorage.getItem('token'))
  async function getAllOrders() {
      return axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)
  }
  const  {data,isLoading,isError}=useQuery({
      queryKey:['Orders'],
      queryFn:getAllOrders,
      select:(data)=>{
        return data.data.at(-1)
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
            <h1 className='text-3xl text-red-600 font-bold'>Can't get your orders </h1>
          </div>
        }
console.log(id);

  return (
    <section id="allOrders" className='container mx-auto my-10 py-10'>
          <Helmet>
      <title> All Orders</title>
    </Helmet>
      {console.log(data)}
      
<div className="relative overflow-x-auto shadow-md sm:rounded-lg py-10 mt-10">
  <h1>Payment method:{data.paymentMethodType}</h1>
  <h3 className='font-bold mb-3'>Total Price:{data.totalOrderPrice} EGP</h3>
  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="px-16 py-3">
          <span className="sr-only">Image</span>
        </th>
        <th scope="col" className="px-6 py-3">
          Product
        </th>
        <th scope="col" className="px-6 py-3">
          Qty
        </th>
        <th scope="col" className="px-6 py-3">
          Price
        </th>
      </tr>
    </thead>
    <tbody>
   {data?.cartItems.map((product)=>   <tr key={product.product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
        <td className="p-4">
          <img src={product.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt={product.product.title} />
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
         {product.product.title}
        </td>
        <td className="px-6 py-4">
          <div className="flex items-center">
         
            <div>

              Count: {product.count} 
            </div>
            
          </div>
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
          {product.price} EGP
        </td>
      </tr>)}
    </tbody>
  </table>
</div>


    </section>
  )
}
