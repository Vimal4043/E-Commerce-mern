import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import { formatDistanceToNow } from "date-fns";
import api from "../api/axios";

const statusStyles = {
  Placed: "bg-yellow-100 text-yellow-800",
  Confirmed: "bg-blue-100 text-blue-800",
  Packed: "bg-indigo-100 text-indigo-800",
  Shipped: "bg-purple-100 text-purple-800",
  Delivered: "bg-green-100 text-green-800",
  Cancelled: "bg-red-100 text-red-800",
};

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const loadOrders = async () => {
    try {
      const res = await api.get("/orders/admin");
      setOrders(res.data);
    } catch (error) {
      console.error("Error loading admin orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const filteredOrders = useMemo(() => {
    const query = search.trim().toLowerCase();

    return orders.filter((order) => {
      const orderNumber = order._id.slice(-6).toLowerCase();
      const customerName = order.userId?.name?.toLowerCase() || "";
      const customerEmail = order.userId?.email?.toLowerCase() || "";
      const status = (order.status || "Placed").toLowerCase();
      const matchesSearch =
        !query ||
        orderNumber.includes(query) ||
        customerName.includes(query) ||
        customerEmail.includes(query);
      const matchesStatus = !statusFilter || status === statusFilter.toLowerCase();

      return matchesSearch && matchesStatus;
    });
  }, [orders, search, statusFilter]);

  const totalRevenue = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="h-8 w-56 bg-gray-200 rounded animate-pulse mb-4"></div>
        <div className="grid gap-4 md:grid-cols-3 mb-6">
          {[1, 2, 3].map((item) => (
            <div key={item} className="h-24 rounded-2xl bg-gray-100 animate-pulse border border-gray-200"></div>
          ))}
        </div>
        <div className="h-12 bg-gray-100 rounded-xl animate-pulse mb-6"></div>
        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <div key={item} className="h-28 rounded-2xl bg-gray-100 animate-pulse border border-gray-200"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col gap-2 mb-6">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-gray-500">Admin Portal</p>
          <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
          <p className="text-gray-600">Review every order, customer, and fulfillment status in one place.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3 mb-6">
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Total Orders</p>
            <p className="mt-2 text-3xl font-bold text-gray-900">{orders.length}</p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Visible Orders</p>
            <p className="mt-2 text-3xl font-bold text-gray-900">{filteredOrders.length}</p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Revenue</p>
            <p className="mt-2 text-3xl font-bold text-gray-900">₹{totalRevenue.toFixed(2)}</p>
          </div>
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
          <div className="flex flex-1 flex-col gap-3 md:flex-row">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search order id, customer name, or email"
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full md:w-56 rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Statuses</option>
              <option value="Placed">Placed</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Packed">Packed</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          <Link
            to="/admin/products"
            className="inline-flex items-center justify-center rounded-xl bg-gray-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
          >
            Go to Products
          </Link>
        </div>

        {filteredOrders.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-gray-300 bg-white py-20 text-center">
            <h2 className="text-xl font-semibold text-gray-900">No matching orders</h2>
            <p className="mt-2 text-gray-500">Try clearing the search or status filter.</p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Order</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Customer</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Items</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Total</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Date</th>
                    <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredOrders.map((order) => {
                    const itemCount = order.items.reduce((sum, item) => sum + item.quantity, 0);
                    const orderStatus = order.status || "Placed";

                    return (
                      <tr key={order._id} className="hover:bg-gray-50/80">
                        <td className="px-6 py-5 align-top">
                          <p className="font-semibold text-gray-900">#{order._id.slice(-6).toUpperCase()}</p>
                          <p className="text-sm text-gray-500">ID: {order._id}</p>
                        </td>
                        <td className="px-6 py-5 align-top">
                          <p className="font-medium text-gray-900">{order.userId?.name || "Unknown customer"}</p>
                          <p className="text-sm text-gray-500">{order.userId?.email || "No email available"}</p>
                        </td>
                        <td className="px-6 py-5 align-top text-sm text-gray-700">
                          {itemCount} item{itemCount > 1 ? "s" : ""}
                        </td>
                        <td className="px-6 py-5 align-top font-semibold text-gray-900">₹{order.totalAmount}</td>
                        <td className="px-6 py-5 align-top">
                          <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[orderStatus] || "bg-gray-100 text-gray-700"}`}>
                            {orderStatus}
                          </span>
                        </td>
                        <td className="px-6 py-5 align-top text-sm text-gray-600">
                          <p>{new Date(order.createdAt).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}</p>
                          <p className="text-gray-400">
                            {formatDistanceToNow(new Date(order.createdAt), { addSuffix: true })}
                          </p>
                        </td>
                        <td className="px-6 py-5 align-top text-right">
                          <Link
                            to={`/orders/${order._id}`}
                            className="inline-flex rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-gray-400 hover:bg-gray-100"
                          >
                            View Details
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;