import { useState } from 'react'

import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Home from './components/Home/Home';
import Cart from './components/Cart/Cart';
import Products from './components/Products/Products';
import ProductDetails from './components/ProductDetails/ProductDetails';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';
import Brands from './components/Brands/Brands';
import AuthContextProvider from './context/AuthContextProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import CartContextProvider from './context/CartContextProvider';
import { Toaster } from 'react-hot-toast';
import Payment from './components/Payment/Payment';
import AllOrders from './components/AllOrders/AllOrders';
import VerifyForgetPassword from './components/VerifyForgetPassword/VerifyForgetPassword';
import ResetPassword from './components/ResetPassword/ResetPassword';
import UpdateLoggedUserPassword from './components/UpdateLoggedUserPassword/UpdateLoggedUserPassword';
import UpdateUserData from './components/UpdateUserData/UpdateUserData';
import WishListContextProvider from './context/WishListContextProvider';
import WishList from './components/WishList/WishList';
import Categories from './components/Categories/Categories';
import CategoryDetails from './components/CategoryDetails/CategoryDetails';

function App() {
  const client=new QueryClient()
     const router=createBrowserRouter([
      {path:'', element:<Layout/>, children:[
        {path:'', element:<Register/>},
        {path:'login', element:<Login/>},
        {path:'resetPassword', element:<ResetPassword/>},
        {path:'verifyForgetPassword', element:<VerifyForgetPassword/>},
        {path:'home', element:<ProtectedRoute><Home/></ProtectedRoute>},
        {path:'cart', element:<ProtectedRoute><Cart/></ProtectedRoute>},
        {path:'brands', element:<ProtectedRoute><Brands/></ProtectedRoute>},
        {path:'payment', element:<ProtectedRoute><Payment/></ProtectedRoute>},
        {path:'products', element:<ProtectedRoute><Products/></ProtectedRoute>},
        {path:'allorders', element:<ProtectedRoute><AllOrders/></ProtectedRoute>},
        {path:'updatePassword', element:<ProtectedRoute><UpdateLoggedUserPassword/></ProtectedRoute>},
        {path:'updateUserData', element:<ProtectedRoute><UpdateUserData/></ProtectedRoute>},
        {path:'wishList', element:<ProtectedRoute><WishList/></ProtectedRoute>},
        {path:'categories', element:<ProtectedRoute><Categories/></ProtectedRoute>},
        {path:'productDetails/:id', element:<ProtectedRoute><ProductDetails/></ProtectedRoute>},
        {path:'categoryDetails/:id', element:<ProtectedRoute><CategoryDetails/></ProtectedRoute>},
        {path:'*', element:<NotFoundPage/>},
      ]}
     ])
  return (
    <AuthContextProvider>
     <CartContextProvider>


<QueryClientProvider client={client}>
<WishListContextProvider>
      <div >
     <RouterProvider router={router}/>
    </div>
    <Toaster />
    </WishListContextProvider>
      </QueryClientProvider>

     </CartContextProvider>
    

    </AuthContextProvider>
   
  )
}

export default App
