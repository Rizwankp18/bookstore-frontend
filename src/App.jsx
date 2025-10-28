import { Route, Routes } from "react-router-dom"
import LandingPage from "./common/pages/LandingPage"
import Auth from "./common/pages/Auth"
import PageNotFound from "./common/pages/PageNotFind"
import Allbooks from "./user/pages/AllBooks"
import Careers from "./user/pages/Career"
import Contact from "./user/pages/Contact"
import Profile from "./user/pages/Profile"
import ViewBook from "./user/pages/ViewBook"
import Preloader from "./common/components/Preloader"
import { useEffect, useState } from "react"
import AdminBooks from "./admin/pages/AdminBooks"
import AdminCareers from "./admin/pages/AdminCareers"
import AdminHome from "./admin/pages/AdminHome"
import AdminSettings from "./admin/pages/AdminSettings"
import { ToastContainer } from 'react-toastify';



function App() {
  const [isLoading,setIsLoading] = useState(false)

  useEffect(()=>{
      setTimeout(()=>{
        setIsLoading(true)
      },1000)
  },[])

  return (
    <>
      {/* common path */}
      <Routes>
        <Route path="/" element={isLoading ? <LandingPage/> : <Preloader />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Auth register />} />
        <Route path="*" element={<PageNotFound />} />

        {/* user side pages path */}
        <Route path="/allbook" element={<Allbooks />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/viewbook/:id" element={<ViewBook />} />

        {/* admin side pages path */}
        <Route path="/admin-books" element={<AdminBooks/>}  />
        <Route path="/admin-career" element={<AdminCareers/>}/>
        <Route path="/admin-home" element={<AdminHome/>}/>
        <Route path="/admin-setting" element={<AdminSettings/>}/>
        

      </Routes>

<ToastContainer
position="top-center"
autoClose={5000}
theme="colored"/>
    </>
  )
}

export default App
