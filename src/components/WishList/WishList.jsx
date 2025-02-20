import { useQuery } from '@tanstack/react-query'
import React, { useContext } from 'react'
import { useState } from 'react'
import { wishListContext } from '../../context/WishListContextProvider'
import { RotatingLines } from 'react-loader-spinner'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { cartContext } from '../../context/CartContextProvider'
import { Helmet } from 'react-helmet'

export default function WishList() {
  const {getWishList,deleteItem,deleteItemFromWishListLoader}=useContext(wishListContext)
  const {addProductToCart}=useContext(cartContext)

    const [menuOpen, setMenuOpen] = useState({
      menu1: false,
      menu2: false,
      menu3: false,
    });
  
    const handleClick = (menu) => {
      setMenuOpen((prev) => ({ ...prev, [menu]: !prev[menu] }));
    };
  
 const {isLoading,data,isError}= useQuery({
    queryKey:['WishList'],
    queryFn:getWishList,
    select:(data)=>{
      return data.data
    }
    
  })
if(isLoading){
    return <div className='h-screen flex justify-center items-center'>
      <Helmet>
    <title>WishList</title>
  </Helmet>
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
      <Helmet>
    <title>WishList</title>
  </Helmet>
      <h1 className='text-3xl text-red-600 font-bold'>Can't reload Your Wish List 😥😥😥😥</h1>
    </div>
  }
  async function addToCart(id){
    const flag=await addProductToCart(id)
    if(flag){
      toast.success('Product Added Successfully',{
        style:{
          fontWeight:'bold',
          color:"green"
        }
      })
    }
    else{
      toast.error('Failed to add the product',{
        style:{
          fontWeight:'bold',
          color:"red"
        }
      })
    }
  }
  async function removeItem(id) {
    const res=deleteItem(id)
    if(res){
      toast.success('Item is removed')
      getWishList()
    }
    else{
      toast.error("Can't remove the item from your wish list")
    }
    
  }
  return <>
  <Helmet>
    <title>WishList</title>
  </Helmet>
 <div className="mx-auto container px-4 md:px-6 2xl:px-0 py-12 flex justify-center items-center mt-10">

      <div className="flex flex-col justify-start items-start">
        <h1 className="mt-3 text-3xl lg:text-4xl tracking-tight font-semibold leading-8 lg:leading-9 text-green-800 dark:text-white">
          WishList 
        </h1>
        <p className="mt-4 text-2xl tracking-tight leading-6 text-gray-600 dark:text-white">
          {data?.count } items
        </p>

        <div className="mt-10 lg:mt-12 grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-10 lg:gap-y-0  w-3/4 mx-auto lg:w-full">
          {data?.data?.map((item) => (
            <div key={item._id} className=" relative flex flex-col shadow-md shadow-green-600  h-fit pb-10 mb-10 px-4">
              <div className="relative ">
                <img
                  className=" lg:block w-1/2 object-contain mx-auto"
                  src={item.imageCover }
                  alt={item.title}
                />
              
              </div>
              <div className="mt-6 flex justify-between items-center">
                <p className="tracking-tight text-2xl font-semibold leading-6 text-green-800 ">
                  {item.title.split(' ',5).join(' ')}
                </p>
                <button
                  aria-label="show menu"
                  onClick={() => handleClick(item._id)}
                  className="focus:outline-none py-2.5 px-2 bg-green-800 dark:bg-white  text-white hover:text-gray-400 hover:bg-gray-200"
                >
                  {menuOpen[item._id] ? "▲" : "▼"}
                </button>
              </div>
              <button  className=" absolute top-0 end-0 tracking-tight py-1 text-lg  flex items-start text-white cursor-pointer transition-500 duration-500  px-2 bg-red-800 border border-red-800 hover:bg-red-700  dark:hover:text-white" onClick={()=>removeItem(item._id)}>
                     <span>Remove</span> {deleteItemFromWishListLoader[item._id]&& <i className='ms-4 fas fa-spin fa-spinner pt-1 text-white'></i>}
                    </button>
              {menuOpen[item._id] && (
                <div className="flex flex-col justify-start items-start mt-12">
                  <p className="tracking-tight text-sm leading-3 text-green-800 dark:text-white">{item.category.name}</p>
                  <p className="mt-2 tracking-tight text-base font-medium leading-4 text-black/50 dark:text-white">
                    {item.description} 
                  </p>
                 
                  <p className="mt-6 tracking-tight text-base font-medium leading-4 text-gray-800 dark:text-white">
                    ${item.price} EGP
                  </p>
                  <div className="flex flex-col lg:flex-row items-center mt-10 w-full space-y-4 lg:space-y-0 lg:space-x-4">
                    <Link to={`/productDetails/${item._id}`} className="w-full text-center cursor-pointer py-4 border transition-all duration-500  border-green-800 hover:bg-green-800 hover:text-white dark:border-white dark:bg-transparent dark:text-white dark:hover:bg-green-800 dark:hover:text-white">
                      More information
                    </Link>
                    <button className="w-full tracking-tight py-5 text-lg leading-4 text-white cursor-pointer transition-500 duration-500  bg-green-800 border border-green-800 hover:bg-green-700  dark:hover:text-white" onClick={()=>addToCart(item._id)}>
                      Add to cart
                    </button>
                  
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  </> 
        

}