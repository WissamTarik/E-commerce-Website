import React, { Children, createContext } from 'react'
import { useState } from 'react'
export const authContext=createContext()
export default function AuthContextProvider({children}) {

    const [token, setToken] = useState(localStorage.getItem('token'))
    const [userName, setUserName] = useState(localStorage.getItem('userName'))
    const [email, setEmail] = useState(localStorage.getItem('email'))
    
  return (
    <authContext.Provider value={{setToken,token,setUserName,userName,email,setEmail}}>
      {children}
    </authContext.Provider>
  )
}
