import React from 'react'
import { useState } from 'react'
import amazon from "../../assets/images/amazon-pay.png"
import paypal from "../../assets/images/paypal.png"
import americanExpress from "../../assets/images/American-Express-Color.png"
import masterCard from "../../assets/images/mastercard.webp"
import appleStore from "../../assets/images/get-apple-store.png"
import googlePlay from "../../assets/images/get-google-play.png"
export default function Footer() {
  return (
    <footer className='bg-gray-300  py-10'>
         <div className="container mx-auto">
        <div>
        <h2 className='capitalize text-2xl'>get the fresh cart app</h2>
        <p className='text-gray-600 my-2'>We will send you a link ,open it on your phone to download the app</p>
        </div>

        <div className='grid lg:grid-cols-[4fr_1fr]  md:grid-cols-[3fr_1fr] gap-10 px-3  my-3 '>
          <input type="text" className='bg-white border border-gray-400 rounded-md  focus:border-green-600 focus:outline-0 focus:placeholder:opacity-0 px-4 py-2 caret-green-600'  placeholder='Email'/>
          <button className='btn px-0'>Share App Link</button>

        </div>
        <div className='flex lg:flex-row flex-col   justify-center   lg:justify-between  mt-10 px-3'>
          <div className='flex items-center  gap-3  flex-wrap'>
             <span className='capitalize text-xl  lg:inline lg:w-fit block w-full'>payment partners</span>
             <img src={amazon} alt="Amazon " className='w-20 object-cover mt-3' />
             <img src={americanExpress} alt="American Express image " className='w-20 object-cover mt-3' />
             <img src={masterCard} alt="master card image " className='w-20 object-cover mt-3' />
             <img src={paypal} alt="paypal image " className='w-20 object-cover mt-3' />
          </div>
          <div className='flex items-center gap-1 flex-wrap'>
          <span className='capitalize text-lg mt-3 lg:inline lg:w-fit block w-full'>get deliveries with fresh cart</span>
         
          <img src={appleStore} alt="apple store" className='w-22 object-cover mt-3' />
          <img src={googlePlay} alt="Google play" className='w-28 object-cover mt-3' />

          </div>
        </div>
         </div>

    </footer>
  )
}
