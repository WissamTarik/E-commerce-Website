import axios from 'axios';
import { useFormik } from 'formik'
import React, { useContext } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import *as Yup from "yup"
import { authContext } from '../../context/AuthContextProvider';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet';
export default function ResetPassword() {
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  let navigate=useNavigate()
  let {setToken}=useContext(authContext)
  async function resetPassword(values) {
    setIsLoading(true)
     console.log(values);
     try {
      const {data}=await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword',values)
      console.log(data);
      localStorage.setItem('token',data.token)
      setToken(data.token)
      navigate('/home')

      
     } catch (error) {
         console.log(error);
         setErrorMessage("you can't reset your password")
         
     }finally{
      setIsLoading(false)
     }
  }
  const validationSchema=Yup.object().shape({
    email:Yup.string().email('Invalid Email').required("Email is required to reset password"),
      newPassword:Yup.string().matches(/^[a-zA-Z]\w{6,7}$/,'Password must be between 7 and 8 characters').required('Password is required to reset password'),
  
  })
  const resetPasswordFormik=useFormik({
    initialValues:{
          email:'',
          newPassword:'',

    },
    validationSchema,
    onSubmit:resetPassword
  })
  if(errorMessage){
    toast.error(errorMessage,{
      style:{
        color:'red',
        fontWeight:"bold"
      }
    })
    setErrorMessage(null)

  }
  return (
    <section className="h-screen md:flex my-10" id="resetPassword">
          <Helmet>
      <title> Reset Password</title>
    </Helmet>
     <div className="relative overflow-hidden md:flex w-1/3 px-20  bg-gradient-to-tr from-green-800 to-lime-700 i justify-around items-center hidden">
       <div>
       <h1 className="text-white font-bold text-4xl font-sans"> Route E-commerce</h1>
         <p className="text-white mt-1 capitalize">Feel free to change your password</p>
       <i className="fa-solid fa-cart-shopping text-white text-5xl text-center my-3"></i>
       </div>
       <div className="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8" />
       <div className="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8" />
       <div className="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8" />
       <div className="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8" />
     </div>
     <div className=" md:w-2/3 px-14 justify-center py-10 items-center bg-white">
       <form className="bg-white" onSubmit={resetPasswordFormik.handleSubmit}>
      <div>
   
 </div>
 
  <div>
 
 </div>
 
         <h1 className="text-gray-800 font-bold text-2xl mb-3">Reset:</h1>
    
        <label htmlFor="email">Email:</label>
         <div className="flex items-center border-2  py-2 px-3 rounded-2xl mb-4 mt-2  ">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
           </svg>
           <input className="caret-green-400 pl-2 outline-none  grow border-none" type="email" name="email" id="email" placeholder="Email Address"
             onChange={resetPasswordFormik.handleChange}
             value={resetPasswordFormik.values.email}
             onBlur={resetPasswordFormik.handleBlur}
           />
         </div>
 
         {resetPasswordFormik.errors.email && resetPasswordFormik.touched.email?          <p id="filled_error_help" className="my-2 text-md text-red-600 dark:text-red-400"> {resetPasswordFormik.errors.email}</p>
 
 :''}
         <label htmlFor="password">New Password:</label>
         <div className="flex items-center border-2 py-2 px-3 rounded-2xl mt-2 mb-4">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
             <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
           </svg>
           <input className="caret-green-400 pl-2 outline-none border-none grow" type="password" name="newPassword" id="password" placeholder="Password"
    
    onChange={resetPasswordFormik.handleChange}
    value={resetPasswordFormik.values.newPassword}
    onBlur={resetPasswordFormik.handleBlur}
    />
         </div>
         {resetPasswordFormik.errors.newPassword && resetPasswordFormik.touched.newPassword?          <p id="filled_error_help" className="my-2 text-md text-red-600 dark:text-red-400"> {resetPasswordFormik.errors.newPassword}</p>
 
 :''}
 
        
         <button type="submit" className="block  px-6 py-2 bg-green-600 hover:bg-green-500 transition-all duration-500 mt-4  rounded-2xl text-white font-semibold mb-2 cursor-pointer" disabled={isLoading?true:false}>Reset 
          {isLoading&&<i className='fas fa-spinner fa-spin text-white ms-1'></i>}
   
         </button>
       </form>
     </div>
   </section>
  )
}
