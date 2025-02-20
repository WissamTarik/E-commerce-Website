import { jwtDecode } from 'jwt-decode'
import React, { useContext } from 'react'
import { useState } from 'react'
import { authContext } from '../../context/AuthContextProvider'
import { Oval } from 'react-loader-spinner';
import { Helmet } from 'react-helmet';
import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from "yup"
import toast from 'react-hot-toast';
export default function UpdateUserData() {
const {userName,email:userEmail,token}=useContext(authContext)
const [isLoading, setIsLoading] = useState(false)
const [errorMessage, setErrorMessage] = useState(null)

const validationSchema=Yup.object().shape({
  email:Yup.string().email('Invalid Email').required('Email is required to update your data'),
    name:Yup.string().min(3,'Your name must be at least three characters').max(15,'Your name must not exceed than fifteen characters').required('Name is required to update your data'),
    phone:Yup.string().matches(/^01[0125]\d{8}$/,"Only accept egyptian numbers").required("Phone is required to update")
})
 async function handleUpdate(values) {
  setIsLoading(true)
    try {
        const {data}=await axios.put('https://ecommerce.routemisr.com/api/v1/users/updateMe/',values,{
          headers:{
            token
          }
         
        })
        toast.success("Updated successfully")
        console.log(data);
        
    } catch (error) {
      console.log(error.response.data.errors.msg);
      setErrorMessage(error.response.data.errors.msg)
      
    } finally{
         setIsLoading(false)
    }      
 }
 const updateFormik=useFormik({
       initialValues:{
        name:userName,
        email:userEmail,
        phone:''
       },
       validationSchema,
       onSubmit:handleUpdate
 })

  return (
    <section className="h-screen md:flex mt-10" id="register">
    <Helmet>
<title> Update user data</title>
</Helmet>
<div className="relative overflow-hidden md:flex w-1/3 px-20  bg-gradient-to-tr from-green-800 to-lime-700 i justify-around items-center hidden">
<div>
<h1 className="text-white font-bold text-4xl font-sans">Welcome To Route E-commerce</h1>
  <p className="text-white mt-1 capitalize">Feel free to update your data</p>
<i className="fa-solid fa-cart-shopping text-white text-5xl text-center my-3"></i>
</div>
<div className="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8" />
<div className="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8" />
<div className="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8" />
<div className="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8" />
</div>
<div className=" md:w-2/3 px-14 justify-center py-10 items-center bg-white">
<form className="bg-white" onSubmit={updateFormik.handleSubmit}>
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

  <h1 className="text-gray-800 font-bold text-2xl mb-3">Update your data:</h1>
  <label htmlFor="name" className='mb-2'>Name:</label>
  <div className="flex items-center border-2 py-2 px-3 rounded-2xl mt-2 mb-4">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
    </svg>
    <input className="caret-green-400 pl-2 outline-none  w-full border-none" type="text" name="name"
        onChange={updateFormik.handleChange}
        onBlur={updateFormik.handleBlur}
        value={updateFormik.values.name}
    id="name" placeholder=" name" 
     
    />
  </div>
{updateFormik.errors.name && updateFormik.touched.name?          <p id="filled_error_help" className="my-2 text-md text-red-600 dark:text-red-400"> {updateFormik.errors.name}</p>

:''} 
 <label htmlFor="email">Email:</label>
  <div className="flex items-center border-2  py-2 px-3 rounded-2xl mb-4 mt-2  ">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
    </svg>
    <input className="caret-green-400 pl-2 outline-none border-none w-full" type="email" name="email" id="email" placeholder="Email Address"
             onChange={updateFormik.handleChange}
             onBlur={updateFormik.handleBlur}
             value={updateFormik.values.email}
    />
  </div>

 {updateFormik.errors.email && updateFormik.touched.email?          <p id="filled_error_help" className="my-2 text-md text-red-600 dark:text-red-400"> {updateFormik.errors.email}</p>

:''} 
 

  
 
  <label htmlFor="phone">Phone:</label>
  <div className="flex items-center border-2 py-2 px-3 rounded-2xl mt-2 mb-4">
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
<rect x="7" y="2" width="10" height="20" rx="2" ry="2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
<circle cx="12" cy="18" r="1" fill="currentColor" />
</svg>


    <input className="caret-green-400 pl-2 w-full outline-none border-none" type="tel" name="phone" id="phone" placeholder="Phone"
 
 onChange={updateFormik.handleChange}
 onBlur={updateFormik.handleBlur}
 value={updateFormik.values.phone}
  />
  </div>
 
  {updateFormik.errors.phone && updateFormik.touched.phone?          <p id="filled_error_help" className="my-2 text-md text-red-600 dark:text-red-400"> {updateFormik.errors.phone}</p>

:''} 
 

  
  <button type="submit" className="block  px-6 py-2 bg-green-600 hover:bg-green-500 transition-all duration-500 mt-4  rounded-2xl text-white font-semibold mb-2 cursor-pointer" disabled={isLoading?true:false} >Update
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
