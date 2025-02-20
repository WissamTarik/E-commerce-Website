import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { RotatingLines } from 'react-loader-spinner'
import { cartContext } from '../../context/CartContextProvider'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { jwtDecode } from 'jwt-decode'

export default function Cart() {
  const token=localStorage.getItem('token')

   const {getUserCart,getUserCartLoader,getUserCartError,numOfCartItems,totalPrice,cartProducts,deleteSpecificProduct,deleteCartLoader,deleteAllCart,deleteAllLoader,updateProductQuantity,updateProductQuantityLoader}=useContext(cartContext)
   useEffect(() => {
      
    getUserCart()
    }, [])
    let userName;
      if(token){
        const {name}=jwtDecode(token)
        userName=name
      }
   if(getUserCartLoader){
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
    if(getUserCartError){
      return  <div className='h-screen flex justify-center items-center'>
        <h1 className='text-3xl text-red-600 font-bold'>{getUserCartError}</h1>
      </div>
    }
    async function deleteAll() {
       const flag=await deleteAllCart()
       if(flag){
        toast.success('Cart is Empty Now',{
          style:{
            fontWeight:'bold',
            color:"green"
          }
        })
      }
      else{
        toast.error('Failed to empty the cart',{
          style:{
            fontWeight:'bold',
            color:"red"
          }
        })
      }
    }
  async function deleteItem(id) {
     const flag=await deleteSpecificProduct(id)
     if(flag){
      toast.success('Product Deleted Successfully',{
        style:{
          fontWeight:'bold',
          color:"green"
        }
      })
    }
    else{
      toast.error('Failed to delete the product',{
        style:{
          fontWeight:'bold',
          color:"red"
        }
      })
    }
  }
  async function updateSpecificItem(id,count) {
  const flag=  updateProductQuantity(id,count)
  if(flag){
    toast.success('Product Updated Successfully',{
      style:{
        fontWeight:'bold',
        color:"green"
      }
    })
  }
  else{
    toast.error('Failed to update the product',{
      style:{
        fontWeight:'bold',
        color:"red"
      }
    })
  }
  }
  if(deleteAllLoader){
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
    
  return (
    <section id="cart" className='py-14 mt-14 container mx-auto'>
              <Helmet>
      <title> Cart</title>
    </Helmet>
      {updateProductQuantityLoader&& <i className='fas fa-spin fa-spinner text-red-500 text-4xl font-bold block mx-auto my-5 mt-12 text-center '></i>}
      {deleteCartLoader&& <i className='fas fa-spin fa-spinner text-red-500 text-4xl font-bold block mx-auto my-5 mt-12 text-center '></i>}
<div className='mt-10'>
  <h1 className='text-4xl text-center'>{userName} Cart <i className='fas fa-cart-shopping'></i></h1>
<h2 className='font-extrabold text-xl text-green-600'>Items Count: {numOfCartItems}</h2>
<h3 className='font-bold text-2xl text-green-600'>Total Price: {totalPrice} EGP</h3>

</div>
      <div className='text-end my-5 px-5'>
        <button onClick={deleteAll} className='text-white font-bold border-2 rounded-md px-2 py-1 bg-red-600 hover:bg-red-500 border-red-600 transition-all duration-500 cursor-pointer'>Delete All Cart</button>
      </div>
   <div className="relative overflow-x-auto shadow-md sm:rounded-lg py-5 mt-5">
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
        <th scope="col" className="px-6 py-3">
          Action
        </th>
      </tr>
    </thead>
    <tbody>
     {cartProducts?.map((product)=> <tr key={product.product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
        <td className="p-4">
          <img src={product.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt={product.product.title} />
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
          {product.product.title.split(' ',3).join(' ')}
        </td>
        <td className="px-6 py-4">
          <div className="flex items-center">
            <button  className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button" onClick={()=>updateSpecificItem(product.product.id,product.count - 1)} disabled={updateProductQuantityLoader?true:false}>
              <span className="sr-only">Quantity button</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
              </svg>
            </button>
            <div>
              <input type="number" id="first_product" className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={product.count} readOnly />
            </div>
            <button className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button"  onClick={()=>updateSpecificItem(product.product.id,product.count + 1)} disabled={updateProductQuantityLoader?true:false}>
              <span className="sr-only">Quantity button</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
              </svg>
            </button>
          </div>
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
          {product.price} EGP
        </td>
        <td className="px-6 py-4">
          <button onClick={()=>deleteItem(product.product.id)} className=" cursor-pointer font-medium text-red-600 dark:text-red-500 hover:underline" disabled={deleteCartLoader?true:false}>Remove </button>
        </td>
      </tr>)}

    </tbody>
  </table>
  <div className='my-5 text-center'>

    {cartProducts?.length>0 &&   <Link to={'/payment'} className='btn'>Payment</Link>}
   
  </div>
</div>  




    </section>
  )
}
