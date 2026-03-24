import React from 'react'
import Footer from '../components/Footer'
import { Outlet } from 'react-router'
import Header from '../components/Header'
import ScrollToTop from '../components/ScrollToTop'

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      <Header/>

      <div className="grow">
        <Outlet />
      </div>

      <Footer />
    </div>
  )
}

export default Layout