import React, { useContext } from 'react'
import { useState } from 'react'
import logo from "../../assets/images/logo.jpeg"
import user from "../../assets/user.png"
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { authContext } from '../../context/AuthContextProvider'
import { jwtDecode } from 'jwt-decode'
import { cartContext } from '../../context/CartContextProvider'
export default function Navbar() {
  const [openNav, setOpenNav] = useState(false)
  const token=localStorage.getItem('token')
  const {setToken}=useContext(authContext)
  const {numOfCartItems}=useContext(cartContext)
  let userName;
  if(token){
    const {name}=jwtDecode(token)
    userName=name
  }
  
  let navigate=useNavigate()
  function handleLogout(){
    localStorage.removeItem('token')
    localStorage.removeItem('userName')
    localStorage.removeItem('email')
    setToken(null)
    navigate('/login')
  }
  function handleOpenNav(){
    setOpenNav(!openNav)
    
  }
 
  return (
    <nav className='bg-gray-300 flex justify-between items-center py-3 px-5  fixed start-0 end-0 top-0 z-[999] '>
     <div className='flex gap-4 items-center'>
     <div className="logo">
         <img src={logo} alt="Fresh Cart Logo" />
      </div> 
      {token?  <ul className=' gap-4 lg:flex hidden'>
          <li className='font-bold'><NavLink to={'/home'} className="hover:text-green-600 transition-colors duration-300">Home</NavLink></li>
          <li className='font-bold'><NavLink to={'/products'} className="hover:text-green-600 transition-colors duration-300">Products</NavLink></li>
          <li className='font-bold capitalize'><NavLink to={'/brands'} className="hover:text-green-600 transition-colors duration-300">brands</NavLink></li>
          <li className='font-bold capitalize'><NavLink to={'/cart'} className="hover:text-green-600 transition-colors duration-300">cart</NavLink></li>
          <li className='font-bold capitalize'><NavLink to={'/wishList'} className="hover:text-green-600 transition-colors duration-300">wishList</NavLink></li>
          <li className='font-bold capitalize'><NavLink to={'/categories'} className="hover:text-green-600 transition-colors duration-300">categories</NavLink></li>
         </ul>:''}
        
     </div>

   <div className=' items-center gap-4 lg:flex hidden'>
    <ul className='flex gap-2'>
      <li><i className='fab fa-facebook'></i></li>
      <li><i className='fab fa-twitter'></i></li>
      <li><i className='fab fa-instagram'></i></li>
      <li><i className='fab fa-tiktok'></i></li>
    </ul>
    
   <ul className='flex gap-3 items-center'>
    {token?      <>
      <li className='bg-green-600 hover:bg-red-500 hover:border-red-600 border border-green-600 transition-colors duration-300 text-white cursor-pointer rounded-md px-2 py-1 font-bold' onClick={handleLogout}>Logout</li>
      <li className='bg-green-600 hover:bg-red-500 hover:border-red-600 border border-green-600 transition-colors duration-300 text-white cursor-pointer rounded-md px-2 py-1 font-bold' onClick={()=>navigate('/updatePassword')} >Update Password</li>
      <li className='font-bold flex items-center gap-4'><span>Welcome {userName}! </span><span className='cursor-pointer  hover:shadow-2xl hover:shadow-green-600 transition-all duration-500 p-2 hover:bg-green-200 rounded-full' onClick={()=>navigate('/updateUserData')}><img src={user} alt="" className='w-10 h-10' /></span></li>
       <li className='relative'>
        <Link to={'/cart'}><i className='fas fa-shopping-cart text-[#323232] text-3xl'></i>
        <span className='text-white bg-green-600 px-2 flex justify-center items-center  rounded-lg absolute -top-3 -end-3'>{numOfCartItems}</span></Link>
       </li>
    </>
  
:<> <li><NavLink to={'/login'} className='font-bold capitalize hover:text-green-600 transition-colors duration-300'>Login</NavLink></li>
      <li><NavLink to={'/'} className='font-bold capitalize hover:text-green-600 transition-colors duration-300'>Register</NavLink></li></>}
     
     </ul>
     
   </div>
   <div className=' block lg:hidden' onClick={handleOpenNav}>
     <i className='fas fa-bars cursor-pointer'></i>

     </div>
   <div className={`menu pb-4 bg-gray-300 absolute top-[100%] start-0 end-0 lg:hidden  flex-col items-center ${openNav?"opacity-100 flex" :"opacity-0 hidden"} transition-all duration-500`}>
  
   
   <ul className='flex gap-5 px-6 '>
      <li><i className='fab fa-facebook'></i></li>
      <li><i className='fab fa-twitter'></i></li>
      <li><i className='fab fa-instagram'></i></li>
      <li><i className='fab fa-tiktok'></i></li>
    </ul>
    <ul className='items-center w-full px-6 justify-center text-center gap-8 mt-4'>
      {token?<>
        <li className='font-bold py-2 hover:text-green-600 duration-300 transition-colors'><NavLink to={'/home'}>Home</NavLink></li>
          <li className='font-bold py-2 hover:text-green-600 duration-300 transition-colors'><NavLink to={'/products'}>Products</NavLink></li>
          <li className='font-bold py-2 hover:text-green-600 duration-300 transition-colors capitalize'><NavLink to={'/brands'}>brands</NavLink></li>
          <li className='font-bold py-2 hover:text-green-600 duration-300 transition-colors capitalize'><NavLink to={'/cart'}>cart</NavLink></li>
          <li className='font-bold py-2 hover:text-green-600 duration-300 transition-colors capitalize'><NavLink to={'/wishList'}>WishList</NavLink></li>
          <li className='font-bold py-2 hover:text-green-600 duration-300 transition-colors capitalize'><NavLink to={'/categories'}>Categories</NavLink></li>
          <li className='bg-green-600  border border-green-600 transition-colors duration-300 text-white cursor-pointer rounded-md px-2 py-1 font-bold hover:bg-red-500 mb-3' onClick={handleLogout}>Logout</li>
          <li className='bg-green-600  border border-green-600 transition-colors duration-300 text-white cursor-pointer rounded-md px-2 py-1 font-bold hover:bg-red-500' onClick={()=>navigate('/updatePassword')}>Update Password</li>
          <li className='font-bold flex items-center my-5 justify-center gap-4'><span>Welcome {userName}! </span><span className='cursor-pointer hover:shadow-2xl hover:shadow-green-600 transition-all duration-500 p-4 rounded-full ' onClick={()=>navigate('/updateUserData')}><img src={user} alt="" className='w-10 h-10' /></span></li>
          </>:<>
      <li className='py-2 hover:text-green-600 duration-300 transition-colors'><NavLink to={'/login'} className='font-bold capitalize py-3'>Login</NavLink></li>
      <li className='py-2 hover:text-green-600 duration-300 transition-colors'><NavLink to={'/'} className='font-bold capitalize'>Register</NavLink></li>
      </>}
         
       
         </ul>
  
   </div>
    </nav>
  )
}
