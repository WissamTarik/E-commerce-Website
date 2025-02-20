import axios from 'axios'
import React, { useContext } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from "yup"
import { authContext } from '../../context/AuthContextProvider'
import { Oval } from 'react-loader-spinner'
import { useFormik } from 'formik'
import { Helmet } from 'react-helmet'

export default function Login() {
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  let navigate=useNavigate()
   let {setToken}=useContext(authContext)
  let validationSchema=Yup.object().shape({
    email:Yup.string().email("Invalid Email").required("Email is required to Login"),
    password:Yup.string().matches(/^[a-zA-Z]\w{6,7}$/,'Password must be between 7 and 8 characters').required('Password is required to Login'),
  })
  async function handleLogin(values) {
    setIsLoading(true)
    try {
      const {data}=await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin',values)
      localStorage.setItem('token',data.token)
      localStorage.setItem('userName',data.user.name)
      localStorage.setItem('email',data.user.email)
      setToken(data.token)
      navigate('/home')
      
    } catch (error) {
      console.log(error);
      setErrorMessage(error.response.data.message)
      
      
    } finally{
      setIsLoading(false)
    }
    //  const {data}=axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup')
    
  }
  const formikLogin=useFormik({
    initialValues:{
      name:'',
      email:'',
      password:"",
      rePassword:'',
      phone:'',
    },
    validationSchema,
    onSubmit:handleLogin
  })
  
  return (
     <section className="h-screen md:flex mt-10" id="register">
          <Helmet>
      <title> Login</title>
    </Helmet>
     <div className="relative overflow-hidden md:flex w-1/3 px-20  bg-gradient-to-tr from-green-800 to-lime-700 i justify-around items-center hidden">
       <div>
       <h1 className="text-white font-bold text-4xl font-sans">Welcome To Route E-commerce</h1>
         <p className="text-white mt-1 capitalize">The most popular Website in egypt</p>
       <i className="fa-solid fa-cart-shopping text-white text-5xl text-center my-3"></i>
       </div>
       <div className="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8" />
       <div className="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8" />
       <div className="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8" />
       <div className="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8" />
     </div>
     <div className=" md:w-2/3 px-14 justify-center py-10 items-center bg-white">
       <form className="bg-white" onSubmit={formikLogin.handleSubmit}>
      <div>
   {errorMessage?<div className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert">
     <svg className="shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
       <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
     </svg>
     <span className="sr-only">Info</span>
     <div>
       {errorMessage}
     </div>
   </div>:''}
 </div>
 
  <div>
 
 </div>
 
         <h1 className="text-gray-800 font-bold text-2xl mb-3">Login Now:</h1>
    
        <label htmlFor="email">Email:</label>
         <div className="flex items-center border-2  py-2 px-3 rounded-2xl mb-4 mt-2  ">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
           </svg>
           <input className="caret-green-400 pl-2 outline-none border-none w-full" type="email" name="email" id="email" placeholder="Email Address"
             onChange={formikLogin.handleChange}
             value={formikLogin.values.email}
             onBlur={formikLogin.handleBlur}
           />
         </div>
 
         {formikLogin.errors.email && formikLogin.touched.email?          <p id="filled_error_help" className="my-2 text-md text-red-600 dark:text-red-400"> {formikLogin.errors.email}</p>
 
 :''}
         <label htmlFor="password">Password:</label>
         <div className="flex items-center border-2 py-2 px-3 rounded-2xl mt-2 mb-4">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
             <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
           </svg>
           <input className="caret-green-400 pl-2 outline-none border-none w-full" type="password" name="password" id="password" placeholder="Password"
    
    onChange={formikLogin.handleChange}
    value={formikLogin.values.password}
    onBlur={formikLogin.handleBlur}
    />
         </div>
         {formikLogin.errors.password && formikLogin.touched.password?          <p id="filled_error_help" className="my-2 text-md text-red-600 dark:text-red-400"> {formikLogin.errors.password}</p>
 
 :''}
 
 <p>Don't have an account <Link to={'/'}  className="text-green-600 underline">Register</Link></p>
 <Link to={'/verifyForgetPassword'}  className='text-green-600 underline cursor-pointer hover:no-underline'> Forget Password</Link>

        
         <button type="submit" className="block  px-6 py-2 bg-green-600 hover:bg-green-500 transition-all duration-500 mt-4  rounded-2xl text-white font-semibold mb-2 cursor-pointer" disabled={isLoading?true:false}>Login
          {isLoading?<Oval
   visible={true}
   height="30"
   width="30"
   color="#fff"
   ariaLabel="oval-loading"
   wrapperStyle={{}}
   wrapperClass=""
   />:''}
         </button>
       </form>
     </div>
   </section>
  )
}
