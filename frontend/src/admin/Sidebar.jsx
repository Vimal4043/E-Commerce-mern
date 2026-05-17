import { Link, useLocation } from 'react-router'
import { useState } from 'react'
import { FiBarChart2, FiUser, FiBriefcase, FiBookOpen, FiMail, FiPlusCircle, FiCalendar, FiGlobe, FiAward } from 'react-icons/fi'
import { FaBuilding } from 'react-icons/fa'

const Sidebar = () => {
    const base = 'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200'
    const active = 'bg-slate-100 text-slate-900 shadow-sm'
    const idle = 'text-slate-300 hover:bg-slate-800 hover:text-white'
    const { pathname } = useLocation()

    const isActive = (path) => pathname === path || pathname.startsWith(path + '/')

    return (
        <div className="lg:w-72 lg:shrink-0 lg:sticky lg:top-0 lg:self-start">
            <aside className="w-full lg:w-72 bg-slate-900 text-white min-h-screen lg:h-screen p-5 border-r border-slate-800 overflow-y-auto">
                <div className="mb-8">
                    <p className="text-xs uppercase tracking-widest text-slate-400">Agilityhive Research</p>
                    <h2 className="text-2xl font-bold mt-1">Admin Panel</h2>
                </div>

                <nav className="flex flex-col gap-2">
                    <Link to="/admin" className={`${base} ${isActive('/admin') ? active : idle}`}>
                        <FiBarChart2 />
                        Dashboard
                    </Link>

                    <Link to="/admin/products" className={`${base} ${isActive('/admin/products') ? active : idle}`}>
                        <FiBriefcase />
                        Products
                    </Link>

                    <Link to="/admin/orders" className={`${base} ${isActive('/admin/orders') ? active : idle}`}>
                        <FiBookOpen />
                        Orders
                    </Link>

                    <Link to="/admin/contacts" className={`${base} ${isActive('/admin/contacts') ? active : idle}`}>
                        <FiMail />
                        Contacts
                    </Link>

                    <Link to="/admin/products/add" className={`${base} ${isActive('/admin/products/add') ? active : idle}`}>
                        <FiPlusCircle />
                        Add Product
                    </Link>
                </nav>
            </aside>
        </div>
    )
}

export default Sidebar
