import axios from 'axios'
import React, { createContext, useState } from 'react'
export const cartContext=createContext() 
export default function CartContextProvider({children}) {
    const token=localStorage.getItem('token')
    const [cartId, setCartId] = useState(null)
    const [addToCartLoader, setAddToCartLoader] = useState(false)
    const [numOfCartItems, setNumOfCartItems] = useState(null)
    const [totalPrice, setTotalPrice] = useState(null)
    const [cartProducts, setCartProducts] = useState(null)
    const [getUserCartLoader, setGetUserCartLoader] = useState(false)
    const [getUserCartError, setGetUserCartError] = useState(null)
    const [deleteCartLoader, setDeleteCartLoader] = useState(false)
    const [deleteAllLoader, setDeleteAllLoader] = useState(false)
    const [updateProductQuantityLoader, setUpdateProductQuantityLoader] = useState(false)
  
    async function getUserCart() {
        setGetUserCartLoader(true)
        try {
           const {data}= await axios.get('https://ecommerce.routemisr.com/api/v1/cart',{
                headers:{
                  token
                }
               })
             console.log(data);
                   setCartId(data.cartId)
           
               setNumOfCartItems(data.numOfCartItems)
               setTotalPrice(data.data.totalCartPrice)
               setCartProducts(data.data.products)
               
               
               
        } catch (error) {
             setGetUserCartError('Can\' reload the Cart')
             
        }finally{
            setGetUserCartLoader(false)

        }
    }
    async function addProductToCart(productId) {
        setAddToCartLoader(true)
        try {
            const {data}=await axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,{productId},{
                headers:{
                    token
                }
              })
              console.log('Add to cart data' ,data);
              
              setCartId(data.cartId)
              setNumOfCartItems(data.numOfCartItems)
              setAddToCartLoader(false)
              return true
              
        } catch (error) {
            setAddToCartLoader(false)
            return false
        }
    
         
    }
    async function deleteSpecificProduct(id) {
        
        setDeleteCartLoader(true)
         try {

              const {data}=await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
                headers:{token}
              })
              console.log(data);
               setDeleteCartLoader(false)
               setNumOfCartItems(data.numOfCartItems)
               setTotalPrice(data.data.totalCartPrice)
               setCartProducts(data.data.products)
               return true
              
         } catch (error) {
             setDeleteCartLoader(false)
              return false
         }
    }
    async function deleteAllCart() {
        setDeleteAllLoader(true)
        try {
            const {data}=await axios.delete('https://ecommerce.routemisr.com/api/v1/cart',{
                headers:{token}
            })
            
            setNumOfCartItems(0)
            setTotalPrice(0)
            setCartProducts(null)
            setDeleteAllLoader(false)

            return true
            
        } catch (error) {
            setDeleteAllLoader(false)

                 return false            
        }
    }
    async function updateProductQuantity(id,count) {
        setUpdateProductQuantityLoader(true)
        try {
            const {data}=await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{count},{
                headers:{
                    token
                }
            })
            console.log(data);
            setUpdateProductQuantityLoader(false)
            setNumOfCartItems(data.numOfCartItems)
            setTotalPrice(data.data.totalCartPrice)
            setCartProducts(data.data.products)
            return true
        } catch (error) {
            console.log(error);
              setUpdateProductQuantityLoader(false)
              return false
        }
    }
  return (
    <cartContext.Provider value={{addProductToCart,addToCartLoader,cartId,getUserCart,getUserCartLoader,getUserCartError,numOfCartItems,totalPrice,cartProducts,deleteSpecificProduct,deleteCartLoader,deleteAllCart,deleteAllLoader,updateProductQuantity,updateProductQuantityLoader}}>{children}</cartContext.Provider>
  )
}
