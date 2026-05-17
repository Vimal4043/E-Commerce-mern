import { Outlet } from 'react-router'
import Sidebar from './Sidebar'
import AdminNavbar from './AdminNavbar'

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-slate-100 lg:flex">
      <div className="w-full lg:flex">
        <Sidebar />

        <main className="flex-1 min-w-0">
          <AdminNavbar />
          <div className="p-4 md:p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
