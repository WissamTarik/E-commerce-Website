import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { Helmet } from 'react-helmet';
import { RotatingLines } from 'react-loader-spinner';
import { Link, useParams } from 'react-router-dom'
import Slider from 'react-slick';
import { cartContext } from '../../context/CartContextProvider';
import toast from 'react-hot-toast';

export default function ProductDetails() {
  const {id}=useParams()
  const [productsOfSameCategory, setProductsOfSameCategory] = useState(null)
  const [product, setProduct] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)

  const {addProductToCart,addToCartLoader}=useContext(cartContext)

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
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 710,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
    
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
        }
      },
    ]
  };

 async function getProductDetails(){
  setIsLoading(true)
         try {
        const {data}=  await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
         console.log(data);
         
         setProduct(data.data)
         } catch (error) {
           console.log(error);
           setErrorMessage("Product Not Found")
           
         }finally{
          setIsLoading(false)
         }
  
         
  }
async  function getProductsOfSameCategory(){
      const {data}=await axios.get('https://ecommerce.routemisr.com/api/v1/products')
      const x=data.data
      const results=await x.filter((element)=>element.category.name==product.category.name)
      setProductsOfSameCategory(results)
      

  }
 useEffect(()=>{
  getProductDetails()
  getProductsOfSameCategory()
 },[id])

 
 
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
  if(errorMessage){
    return  <div className='h-screen flex justify-center items-center'>
      <h1 className='text-3xl text-red-600 font-bold'>{errorMessage}</h1>
    </div>
  }
  return (
    <section id="productDetails" className='container mx-auto pb-15 overflow-hidden'>
                <Helmet>
      <title> {product?product.title:'Fresh cart'}</title>
    </Helmet>
      <div className='grid lg:grid-cols-[1fr_2fr] items-center gap-4 pt-5  px-4 '>
           <div className='rounded-md'>
             <img src={product?.imageCover} alt={product?.title} className='rounded-md  md:w-full  w-3/4 mx-auto' />
           </div>
           <div >
            <h1 className='text-2xl '>{product?.title}</h1>
            <p className='my-4 text-gray-700 text-lg'>{product?.description}</p>
            <h3 className='text-green-600'>{product?.category.name}</h3>
            <div className='flex justify-between items-center my-3'>
  {product?.priceAfterDiscount?<div>
    <span className='text-red-600 line-through me-2 font-bold'>{product?.price}</span>
    <span>{product?.priceAfterDiscount} EGP</span>
  </div>:<span>{product?.price} EGP</span>}   

  <div>
    <i className='fas fa-star text-yellow-500 me-1'></i>
     {product?.ratingsAverage}
    </div> 
    </div> 
    <div className='px-4'>
  <button className='hover:bg-green-500 bg-green-600 text-white rounded-md font-bold  border border-green-600 px-4 py-2 my-4 cursor-pointer w-full transition-all duration-1000 relative' onClick={()=>addToCart(product._id)} disabled={addToCartLoader?true:false}>Add To Cart
      {addToCartLoader?<i className='fas fa-spinner fa-spin text-red-500 text-lg ms-2'></i>:''}
  </button>

  </div>
           </div>
           
      </div>
      <div className="slider-container">
        <Slider {...settings}>
      {productsOfSameCategory?.map((product)=>
        
        <div key={product._id} className="group   relative  overflow-hidden hover:shadow-lg hover:shadow-green-600 transition-all duration-500 hover:-translate-y-1 max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
          
           <Link to={`/productDetails/${product._id}`}>
           <img className="rounded-t-lg h-60 text-center mx-auto " src={product.imageCover} alt={product.title}  />
          
          <div className="p-5 pb-2">
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
          <div className='px-4'>
          <button className='hover:bg-green-600 hover:text-white rounded-md font-bold  border border-green-600 px-4 py-2 my-4 cursor-pointer w-full transition-all duration-1000 relative translate-y-[500%] group-hover:translate-y-0' onClick={()=>addToCart(product._id)} disabled={addToCartLoader?true:false}>Add To Cart

          {addToCartLoader?<i className='fas fa-spinner fa-spin text-red-500 text-lg ms-2'></i>:''}
          </button>
            
          </div>
        </div>
        
        
              )}
              </Slider>
    </div>
    </section>
  )
}
