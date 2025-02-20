import { useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import React, { createContext, useState } from 'react'
 
export const wishListContext=createContext()
export default function WishListContextProvider({children}) {
  const queryClient=useQueryClient()
  const token=localStorage.getItem('token')
  const [addToWishListLoader,setAddToWishListLoader]=useState({})
  const [deleteItemFromWishListLoader,setDeleteItemFromWishListLoader]=useState({})
  async function addToWishList(productId) {
    setAddToWishListLoader((prev)=>({...prev,[productId]:true}))
      try {
          const {data}=await axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,{productId},{
            headers:{
              token
            }
          })
          console.log(data);
          
             setAddToWishListLoader((prev)=>({...prev,[productId]:false}))
             console.log(addToWishListLoader);
             
             return true
      } catch (error) {
           console.log(error);
           setAddToWishListLoader((prev)=>({...prev,[productId]:false}))
       return false
           
      }
    
  }
  async function getWishList() {
     return await axios.get( `https://ecommerce.routemisr.com/api/v1/wishlist`,{
      headers:{
        token
      }
     })
  }
  async function deleteItem(id) {
    setDeleteItemFromWishListLoader((prev)=>({...prev,[id]:true}))
       try {
             const {data}=await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,{
              headers:{
                token,
              }
             })
             setDeleteItemFromWishListLoader((prev)=>({...prev,[id]:false}))
              console.log(data);
              queryClient.invalidateQueries(['WishList'])
              return true
              
       } catch (error) {
        console.log(error);
        
        setDeleteItemFromWishListLoader((prev)=>({...prev,[id]:false}))
         return false
       }
  }
 
  return (
    <wishListContext.Provider value={{addToWishListLoader,addToWishList,getWishList,deleteItemFromWishListLoader,deleteItem}}>{children}</wishListContext.Provider>
  )
}
