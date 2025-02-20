import { useFormik } from 'formik'
import React, { useContext } from 'react'
import { useState } from 'react'
import * as Yup from "yup"
import { cartContext } from '../../context/CartContextProvider'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { RotatingLines } from 'react-loader-spinner'
import { Helmet } from 'react-helmet'
export default function Payment() {
  const [cash, setCash] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const {cartId}=useContext(cartContext)
  const token=localStorage.getItem('token')
  let navigate=useNavigate()
  function handlePaymentMethod(values){
          const apiObject={
            shippingAddress:{
                ...values
                }
        }
          if(cash){
            handleCashPayment(apiObject)
          }          
          else{
            handleOnlinePayment(apiObject)
          }
  }
async function handleCashPayment(apiObject) {
  setIsLoading(true)
      try {
             const {data}=await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,apiObject,{
              headers:{
                token
              }
             })
             console.log(data);
             navigate('/allorders')
      } catch (error) {
              console.log(error);
              
      }finally{
        setIsLoading(false)
      }
        
}
async function handleOnlinePayment(apiObject) {
  setIsLoading(true)
   try {
    const {data}=await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`,apiObject,{
      headers:{
        token
      }
    })
     console.log(data);
     window.open(data.session.url,'_self')
     
   } catch (error) {
     console.log(error);
     
   }finally{
    setIsLoading(false)
   }
}
  const validationSchema=Yup.object().shape({
    details:Yup.string().max(20,'you can\'t enter more than 20 characters').required('details is required'),
    phone:Yup.string().matches(/^01[0125]\d{8}$/,'Phone must be an egyptian number').required('phone is required'),
    city:Yup.string().max(15,'you can\'t enter more than 15 characters').required('city is required'),
  })

  const paymentFormik=useFormik({
    initialValues:{
       details:'',
       phone:'',
       city:'',
    },
    validationSchema,
    onSubmit:handlePaymentMethod

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
  return (
    <section id='payment' className='my-10 mb-14 pb-3 container mx-auto'>
          <Helmet>
      <title> Payment</title>
    </Helmet>
    <form className="max-w-sm mx-auto py-10" onSubmit={paymentFormik.handleSubmit}>
  <label htmlFor="details" className="block mb-2 text-sm font-medium text-green-900 dark:text-white">Your Details:</label>
  <div className="relative">
    <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
  <path d="M10 0C6.134 0 3 3.134 3 7c0 4.45 5.417 11.338 6.646 12.863a1 1 0 0 0 1.707 0C11.583 18.338 17 11.45 17 7c0-3.866-3.134-7-7-7Zm0 9.5A2.5 2.5 0 1 1 12.5 7 2.5 2.5 0 0 1 10 9.5Z"/>
</svg>

    </div>
    <input type="text"
     name='details'
     onChange={paymentFormik.handleChange}
     onBlur={paymentFormik.handleBlur}
     value={paymentFormik.values.details}
    id="details" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="cairo, Nasr city" />
  </div>
  {paymentFormik.errors.details && paymentFormik.touched.details?    <p className="mt-2 text-md text-red-600 dark:text-red-500"> {paymentFormik.errors.details}</p>
:''}
  <label htmlFor="phone" className="block mb-2 mt-5 text-sm font-medium text-green-900 dark:text-white capitalize">Your phone:</label>
  <div className="relative">
    <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
  <path d="M15.6 12.933c-1.067-.533-2.267-1.2-3.2-.4-.8.667-1.333 1.467-2.4 1.067a11.328 11.328 0 0 1-5.6-5.6c-.4-1.067.4-1.6 1.067-2.4.8-.933.133-2.133-.4-3.2C4.4 1.133 3.733.267 2.933.4 1.867.667 1.067 1.6.667 2.533c-.8 2.133.267 5.6 3.333 8.667 3.066 3.066 6.533 4.133 8.667 3.333.933-.4 1.867-1.2 2.133-2.267.133-.8-.667-1.467-1.2-2.133Z"/>
</svg>

    </div>
    <input type="tel" id="phone"
      name='phone'
      onChange={paymentFormik.handleChange}
      onBlur={paymentFormik.handleBlur}
      value={paymentFormik.values.phone}
    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="01123456789" />
  </div>
  {paymentFormik.errors.phone && paymentFormik.touched.phone?    <p className="mt-2 text-md text-red-600 dark:text-red-500"> {paymentFormik.errors.phone}</p>
:''}

  <label htmlFor="city" className="block mb-2 mt-5 text-sm font-medium text-green-900 dark:text-white capitalize">Your city:</label>
  <div className="relative">
    <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
  <path d="M2 18h16v-2H2v2Zm15-4V7.414L10 .414 3 7.414V14h3v-4h4v4h3v-4h2v4h3ZM5 12V7.828L10 2.828l5 5V12h-1V8H6v4H5Zm4 0V9h2v3H9Z"/>
</svg>
    </div>
    <input type="text" id="city" 
        name='city'
        onChange={paymentFormik.handleChange}
        onBlur={paymentFormik.handleBlur}
        value={paymentFormik.values.city}
    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="Nasr city" />
  </div>
  {paymentFormik.errors.city && paymentFormik.touched.city?    <p className="mt-2 text-md text-red-600 dark:text-red-500"> {paymentFormik.errors.city}</p>
:''}
 <div className='my-10 mb-15 pb-14'>
 <button className='btn me-2' type='submit' onClick={()=>setCash(true)}>Cash Payment</button>
 <button className='btn me-2' type="submit" onClick={()=>setCash(false)}>Online Payment</button>
 </div>
</form>


    </section>
  )
}
