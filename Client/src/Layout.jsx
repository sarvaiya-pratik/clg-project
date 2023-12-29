import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './common/Header/Header'
import Footer from './common/Footer/Footer'
import { ToastContainer } from 'react-toastify'

const Layout = () => {
  return (
    <>
    <ToastContainer position="bottom-right"/>
        <Header/>
        <Outlet/>
        <Footer/>
    </>
  )
}

export default Layout