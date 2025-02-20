import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useContext } from 'react';
import { useState } from 'react'
import { RotatingLines } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import { cartContext } from '../../context/CartContextProvider';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet';
import { Tooltip } from 'react-tooltip';
import { wishListContext } from '../../context/WishListContextProvider';

export default function DisplayProducts() {
  const {addProductToCart,addToCartLoader}=useContext(cartContext)
  const {addToWishListLoader,addToWishList}=useContext(wishListContext)
  const [addedToWishList, setAddedToWishList] = useState({})
  
  useEffect(() => {
    
   if(localStorage.getItem('wishList')){
    setAddedToWishList(JSON.parse(localStorage.getItem('wishList')))
   }
    
  }, [])
  
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
  async function getProducts() {
      return await axios.get('https://ecommerce.routemisr.com/api/v1/products')
 
  }
  async function addToMyWishList(id) {
     const res=await addToWishList(id);
     if(res){
        toast.success("product is added to wish list")
        setAddedToWishList((prev)=>{
          
          
          localStorage.setItem("wishList",JSON.stringify({...prev,[id]:true}))
          return {...prev,[id]:true}
     })
     }
     else{
      toast.error("failed to add product to wish list")

     }
  }
  const {data,isLoading,isError}=useQuery({
    queryKey:['Products'],
    queryFn:getProducts,
    select:(data)=>{
      return data.data.data
    }
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
  if(isError){
    return  <div className='h-screen flex justify-center items-center'>
      <h1 className='text-3xl text-red-600 font-bold'>Can't reload the products</h1>
    </div>
  }
  return (
    <section id="products" className='container mx-auto py-8'>
      <div className='grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-4  '>
      {data?.map((product)=>
        
<div key={product._id} className="group  relative  overflow-hidden hover:shadow-lg hover:shadow-green-600 transition-all duration-500 hover:-translate-y-1  bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
  
   <Link to={`/productDetails/${product._id}`}>
   <img className="rounded-t-lg" src={product.imageCover} alt={product.title} />
  
  <div className="p-5">
    <h3 className='text-green-600'>{product.category.name}</h3>
      <h2 className="mb-2  my-2 font-bold tracking-tight text-gray-900 dark:text-white">{product.title.split(' ',3).join(' ')}</h2>
  <div className='flex justify-between items-center'>
  {product.priceAfterDiscount?<div>
    <span className='text-red-600 line-through me-2 font-bold'>{product.price}</span>
    <span>{product.priceAfterDiscount} EGP</span>
  </div>:<span>{product.price} EGP</span>}   

  <div>
    <i className='fas fa-star text-yellow-500 me-1'></i>
     {product.ratingsAverage}
    </div> 
    </div> 
    {product.priceAfterDiscount&&    <span className='bg-red-500 text-white font-bold rounded-b-lg px-2 py-3 absolute top-0 start-0.5'>Sale</span>    }
  </div>
   </Link>
   <div className='text-end px-4 flex justify-between items-center '>
  <button disabled={addedToWishList[product._id]?true:false} className={`${!addedToWishList[product._id]?"cursor-pointer":''}`}>
  <i className={`fas fa-heart text-end ${addedToWishList[product._id]?"text-red-500":'text-black'} hover:text-red-500  text-2xl transition-colors duration-500`}
  data-tooltip-html="<div>Add to wish List</div>"
    data-tooltip-id={`tooltip-${product._id}`}
       onClick={(e)=>addToMyWishList(product._id,e.target)}
   ></i>
  </button>
      <Tooltip id={`tooltip-${product._id}`} place="top" effect="solid"
        style={{ backgroundColor: "#16A34A", color: "#fff" }}

      />
      {addToWishListLoader[product._id]&&<i className='fas fa-spinner  fa-spin ms-1'></i>}
   </div>
  <div className='px-4'>
  <button onClick={()=>addToCart(product._id)} className='hover:bg-green-600 hover:text-white rounded-md font-bold  border border-green-600 px-4 py-2 my-4 cursor-pointer w-full transition-all duration-1000 relative translate-y-[500%] group-hover:translate-y-0' disabled={addToCartLoader? true:false}>Add To Cart {addToCartLoader?<i className='fas fa-spinner fa-spin text-red-500 text-lg'></i>:''}</button>

  </div>
</div>


      )}
      </div>
    </section>
  )
}
