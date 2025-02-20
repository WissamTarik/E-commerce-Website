import axios from 'axios'
import { useFormik, yupToFormErrors } from 'formik'
import React from 'react'
import { useState } from 'react'
import { Helmet } from 'react-helmet'
import { Oval } from 'react-loader-spinner'
import { useNavigate } from 'react-router-dom'
import * as Yup from "yup"

export default function UpdateLoggedUserPassword() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
 const navigate=useNavigate()

  async function handleUpdate(values) {
    setIsLoading(true)
     try {
       const token=localStorage.getItem('token')
         const {data}=await axios.put('https://ecommerce.routemisr.com/api/v1/users/updateMe/',values,{
          headers:{
            token,
          }
         })
         console.log(data);
         localStorage.removeItem('token')
         navigate('/login')
     } catch (error) {
      console.log(error);
      setError("Can't update the password")
     }finally{
      setIsLoading(false)
     }   
  }
  const validationSchema=Yup.object().shape({
    currentPassword:Yup.string().matches(/^[a-zA-Z]\w{6,7}$/,'Password must start with letter and at least 8 characters').required("Your current password is required to change your password"),
    password:Yup.string().matches(/^[a-zA-Z]\w{6,7}$/,'New password must start with letter and at least 8 characters').required("Your new password is required to change your password"),
    rePassword:Yup.string().oneOf([Yup.ref('password')],'Password And re-password aren\'t match').required("Your re-password is required to change your password"),
  })
  const formikUpdate=useFormik({
    initialValues:{
      currentPassword:'',
      password:'',
      rePassword:'',
 
    },
    validationSchema,
    onSubmit:handleUpdate
  })
  return (
  <section className="h-screen md:flex mt-10 " id="register">
          <Helmet>
      <title> Update Password</title>
    </Helmet>
     <div className="relative overflow-hidden md:flex w-1/3 px-20  bg-gradient-to-tr from-green-800 to-lime-700 i justify-around items-center hidden">
       <div>
       <h1 className="text-white font-bold text-4xl font-sans">Welcome To Route E-commerce</h1>
         <p className="text-white mt-1 capitalize">Feel free to update your password</p>
       <i className="fa-solid fa-cart-shopping text-white text-5xl text-center my-3"></i>
       </div>
       <div className="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8" />
       <div className="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8" />
       <div className="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8" />
       <div className="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8" />
     </div>
     <div className=" md:w-2/3 px-14 self-center justify-center py-10 items-center bg-white">
       <form className="bg-white" onSubmit={formikUpdate.handleSubmit} >
            {error?<div className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert">
  <svg className="shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
  </svg>
  <span className="sr-only">Info</span>
  <div>
    <span className="font-medium">{error}</span> 
  </div>
</div>
:''}
         <h1 className="text-gray-800 font-bold text-2xl mb-3">Update your password:</h1>
    
   
         <label htmlFor="currentPassword"> Current Password:</label>
         <div className="flex items-center border-2 py-2 px-3 rounded-2xl mt-2 mb-4">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
             <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
           </svg>
           <input className="caret-green-400 pl-2 w-full outline-none border-none" type="password" 
            
           value={formikUpdate.values.currentPassword}
           onChange={formikUpdate.handleChange}
           onBlur={formikUpdate.handleBlur}
           name="currentPassword" id="currentPassword" placeholder="current password"
    
   
    />
         </div>
         {formikUpdate.errors.currentPassword&& formikUpdate.touched.currentPassword?
         <p id="outlined_error_help" className="mb-2  text-red-600 dark:text-red-400">{formikUpdate.errors.currentPassword}</p>    
:''}
         <label htmlFor="password"> New Password:</label>
         <div className="flex items-center border-2 py-2 px-3 rounded-2xl mt-2 mb-4">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
             <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
           </svg>
           <input className="caret-green-400 pl-2 outline-none border-none w-full" type="password" name="password" id="password" placeholder="New Password"
    
                   value={formikUpdate.values.password}
           onChange={formikUpdate.handleChange}
           onBlur={formikUpdate.handleBlur}
    />
         </div>
         {formikUpdate.errors.password&& formikUpdate.touched.password?
         <p id="outlined_error_help" className="mb-2  text-red-600 dark:text-red-400">{formikUpdate.errors.password}</p>    
:''}
         <label htmlFor="rePassword"> Re-Password:</label>
         <div className="flex items-center border-2 py-2 px-3 rounded-2xl mt-2 mb-4">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
             <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
           </svg>
           <input className="caret-green-400 pl-2 outline-none border-none w-full" type="password" name="rePassword" id="rePassword" placeholder="Enter New Password Again"
        value={formikUpdate.values.rePassword}
           onChange={formikUpdate.handleChange}
           onBlur={formikUpdate.handleBlur}
   
    />
           
         </div>
         {formikUpdate.errors.rePassword&& formikUpdate.touched.rePassword?
         <p id="outlined_error_help" className="mb-2  text-red-600 dark:text-red-400">{formikUpdate.errors.rePassword}</p>    
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
