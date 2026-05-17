import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router'
import { FiHome } from 'react-icons/fi'

const labels = {
  '/admin': 'Dashboard',
  '/admin/products': 'Products',
  '/admin/products/add': 'Create Product',
  '/admin/orders': 'Orders',
  '/admin/users': 'Users',
}

const getPageTitle = (pathname) => {
  if (pathname.startsWith('/admin/products/update/')) return 'Edit Product'
  if (pathname.startsWith('/admin/products/add')) return 'Create Product'
  return labels[pathname] || 'Admin'
}

const AdminNavbar = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const pageTitle = getPageTitle(pathname)

  const email = localStorage.getItem('email') || localStorage.getItem('username') || ''

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('username')
    localStorage.removeItem('email')
    localStorage.removeItem('isAdmin')
    navigate('/')
  }

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-4 md:px-8">
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">Control Center</p>
          <h1 className="text-xl font-semibold text-slate-900">{pageTitle}</h1>
        </div>

        <div className="flex items-center gap-2">
          {email ? <span className="text-sm text-slate-600">{email}</span> : null}
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-lg border border-slate-400 px-3 py-2 text-sm font-medium text-slate-800 hover:bg-slate-100"
          >
            <FiHome />
            View Site
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center gap-2 rounded-lg border border-rose-300 px-3 py-2 text-sm font-medium text-rose-700 hover:bg-rose-50"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  )
}

export default AdminNavbar
