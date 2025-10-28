import React, { Children, createContext, useState } from 'react'

export const adminUpdateProfile=createContext("")
export const userUpdateProfile=createContext("")


function ContextShare({children}) {

    const [adminProfile,setAdminProfile]=useState({})
        const [userProfile,setUserProfile]=useState({})

  return (
    <>
    
    <adminUpdateProfile.Provider value={{adminProfile,setAdminProfile}}>



   <userUpdateProfile.Provider value={{userProfile,setUserProfile}}>   {children}</userUpdateProfile.Provider>
      
      
      
      </adminUpdateProfile.Provider>
    
    </>
  )
}

export default ContextShare