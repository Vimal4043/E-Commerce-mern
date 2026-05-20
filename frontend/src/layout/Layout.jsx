import React from 'react'
import Footer from '../components/Footer/Footer'
import { Outlet, useLocation } from 'react-router'
import Header from '../components/Navbar/Header'
import ScrollToTop from '../components/Utils/ScrollToTop'

const Layout = () => {
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith('/admin')

  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />

      {!isAdminRoute && <Header />}

      <div className="grow">
        <Outlet />
      </div>

      {!isAdminRoute && <Footer />}
    </div>
  )
}

export default Layout