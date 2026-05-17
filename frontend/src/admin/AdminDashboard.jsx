import React, { useEffect, useState } from 'react'
import api from '../api/axios'

const StatCard = ({ label, value, children }) => (
  <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
    <p className="text-sm text-gray-500">{label}</p>
    <p className="mt-3 text-3xl font-bold text-gray-900">{value}</p>
    {children}
  </div>
)

const AdminDashboard = () => {
  const [counts, setCounts] = useState({ products: 0, orders: 0, users: 0 })

  const loadCounts = async () => {
    try {
      const [pRes, oRes, uRes] = await Promise.allSettled([
        api.get('/products'),
        api.get('/orders/admin'),
        api.get('/user'),
      ])

      setCounts({
        products: pRes.status === 'fulfilled'
          ? (Array.isArray(pRes.value.data) ? pRes.value.data.length : (pRes.value.data.products?.length || 0))
          : 0,
        orders: oRes.status === 'fulfilled'
          ? (Array.isArray(oRes.value.data) ? oRes.value.data.length : (oRes.value.data.length || 0))
          : 0,
        users: uRes.status === 'fulfilled'
          ? (Array.isArray(uRes.value.data) ? uRes.value.data.length : (uRes.value.data.length || 0))
          : 0,
      })
    } catch (err) {
      console.error('Failed to load dashboard counts', err)
    }
  }

  useEffect(() => { loadCounts() }, [])

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-gray-500">Admin Portal</p>
        <h2 className="text-3xl font-bold">Overview</h2>
        <p className="text-gray-600">Track key metrics and quick actions in one place.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <StatCard label="Products" value={counts.products}>
          <a href="/admin/products" className="inline-block mt-4 text-sm text-blue-600">Manage Products</a>
        </StatCard>
        <StatCard label="Orders" value={counts.orders}>
          <a href="/admin/orders" className="inline-block mt-4 text-sm text-blue-600">Review Orders</a>
        </StatCard>
        <StatCard label="Users" value={counts.users}>
          <a href="/admin/users" className="inline-block mt-4 text-sm text-blue-600">View Users</a>
        </StatCard>
      </div>

      <div className="rounded-3xl border border-dashed border-gray-300 bg-white p-6">
        <h3 className="text-lg font-semibold">Quick Actions</h3>
        <div className="mt-4 flex gap-3">
          <a href="/admin/products/add" className="px-4 py-2 bg-blue-600 text-white rounded">Add Product</a>
          <a href="/admin/orders" className="px-4 py-2 border rounded">Review Orders</a>
          <a href="/admin/users" className="px-4 py-2 border rounded">Manage Users</a>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
