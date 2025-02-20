import axios from 'axios'
import { useFormik } from 'formik'
import React from 'react'
import { useState } from 'react'
import { Helmet } from 'react-helmet'
import { RotatingLines } from 'react-loader-spinner'
import { useNavigate } from 'react-router-dom'
import * as Yup from "yup"

export default function VerifyForgetPassword() {
    const [isLoading, setIsLoading] = useState(false)
    const [isLoadingVerify, setIsLoadingVerify] = useState(false)
    const [message, setMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)
    let navigate=useNavigate()
  
  let validationSchema=Yup.object().shape({
      email:Yup.string().email("Invalid Email").required("Email is required to reset Password"),
    })
     const formikEmail=useFormik({
        initialValues:{
          email:'',
        
        },
        validationSchema,
        onSubmit:forgetPassword
      })
     const verifyCodeFormik=useFormik({
        initialValues:{
          input1:'',
          input2:'',
          input3:'',
          input4:'',
          input5:'',
          input6:'',
        
        },
        onSubmit:enterResetCode
      })
  async function forgetPassword(values) {
    setIsLoading(true)
       try {
        const {data}=await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',values)
        console.log(data);
        setMessage(data.message)
        
       } catch (error) {
        console.log(error);
        
       }finally{
        setIsLoading(false)
       }
  } 
  async function enterResetCode(values) {
    const result=Object.values(values).join('')
      console.log(result);
      setIsLoadingVerify(true)
      try {
        const {data}=await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode',{
          "resetCode":result
      })
       console.log(data);
       if(data.status){
        navigate('/resetPassword')
       }
       
      } catch (error) {
         console.log(error);
         setErrorMessage('Verify code is incorrect try again please')
         
      }finally{
        setIsLoadingVerify(false)
      }
  }
   
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
    <div className='mt-10 pt-12 container mx-auto h-screen  '>
          <Helmet>
      <title> Verify</title>
    </Helmet>
      {message?<form className="max-w-sm mx-auto" onSubmit={verifyCodeFormik.handleSubmit}>
  <h1 >Enter verify code sent to your email</h1>
  <div className="flex mb-2 space-x-2 rtl:space-x-reverse">
    <div>
      <label htmlFor="code-1" className="sr-only">First code</label>
      <input type="text" maxLength={1}  name='input1'
          onBlur={verifyCodeFormik.handleBlur}
          onChange={verifyCodeFormik.handleChange}
          value={verifyCodeFormik.values.input1}
      id="code-1" className="block w-9 h-9 py-3 text-sm font-extrabold text-center text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required />
    </div>
    <div>
      <label htmlFor="code-2" className="sr-only">Second code</label>
      <input type="text" maxLength={1} 
       onBlur={verifyCodeFormik.handleBlur}
       onChange={verifyCodeFormik.handleChange}
       value={verifyCodeFormik.values.input2}
      name='input2'  id="code-2" className="block w-9 h-9 py-3 text-sm font-extrabold text-center text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required />
    </div>
    <div>
      <label htmlFor="code-3" className="sr-only">Third code</label>
      <input type="text" maxLength={1}
       onBlur={verifyCodeFormik.handleBlur}
       onChange={verifyCodeFormik.handleChange}
       value={verifyCodeFormik.values.input3}
        name='input3' id="code-3" className="block w-9 h-9 py-3 text-sm font-extrabold text-center text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required />
    </div>
    <div>
      <label htmlFor="code-4" className="sr-only">Fourth code</label>
      <input type="text" maxLength={1} 
       onBlur={verifyCodeFormik.handleBlur}
       onChange={verifyCodeFormik.handleChange}
       value={verifyCodeFormik.values.input4}
      name='input4' id="code-4" className="block w-9 h-9 py-3 text-sm font-extrabold text-center text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required />
    </div>
    <div>
      <label htmlFor="code-5" className="sr-only">Fifth code</label>
      <input type="text" maxLength={1} 
       onBlur={verifyCodeFormik.handleBlur}
       onChange={verifyCodeFormik.handleChange}
       value={verifyCodeFormik.values.input5}
      name='input5' className="block w-9 h-9 py-3 text-sm font-extrabold text-center text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required />
    </div>
    <div>
      <label htmlFor="code-5" className="sr-only">Fifth code</label>
      <input type="text" maxLength={1} 
       onBlur={verifyCodeFormik.handleBlur}
       onChange={verifyCodeFormik.handleChange}
       value={verifyCodeFormik.values.input6}
      name='input6' className="block w-9 h-9 py-3 text-sm font-extrabold text-center text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required />
    </div>
   
  </div>
  <p id="helper-text-explanation" className="mt-5 text-sm text-gray-500 dark:text-gray-400">Please introduce the 6 digit code we sent via email.</p>
  <button className='btn mb-3 mt-10' type='submit'  disabled={isLoading?true:false}>Verify {isLoadingVerify&&<i className='fas fa-spinner fa-spin text-white ms-2'></i>}</button>
  {errorMessage&&<p className='text-red-600 font-bold text-2xl bg-red-200 px-3 py-2 border border-red-500 rounded-lg'>{errorMessage}</p>}

</form>:<form action="" onSubmit={formikEmail.handleSubmit} className='w-3/4 mx-auto'>
         <h1 className='font-extrabold text-green-700 text-2xl'>Reset Password</h1>
      <label htmlFor="email">Email:</label>
         <div className="flex items-center border-2  py-2 px-3 rounded-2xl mb-4 mt-2  ">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
           </svg>
           <input className="caret-green-400 pl-2 grow outline-none border-none" type="email" name="email" id="email" placeholder="Email Address"
             onChange={formikEmail.handleChange}
             value={formikEmail.values.email}
             onBlur={formikEmail.handleBlur}
           />
         </div>
         
         {formikEmail.errors.email && formikEmail.touched.email?          <p id="filled_error_help" className="my-2 text-md text-red-600 dark:text-red-400"> {formikEmail.errors.email}</p>
 
 :''}
           <button className='btn mb-3' type='submit'>Get Reset Code {isLoading&&<i className='fas fa-spinner fa-spin text-white ms-2'></i>} </button>
          {message&&<p className='text-center text-lg text-green-600' >{message}</p>}
      </form>}
      



    </div>
  )
}
