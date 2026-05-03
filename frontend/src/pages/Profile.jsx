import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import api from '../api/axios';
import AddressList from '../components/AddressList';
import ProfileSkeleton from '../loadingSkeleton/ProfileSkeleton';

const Profile = () => {
  const userId = localStorage.getItem("userId");
  const [user, setUser] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  //Load user data
  const loadUser = async () => {
    if (!userId) return;
    const user = await api.get(`/user/${userId}`);
    setUser(user.data);
  };

  //Load user addresses
  const loadAddress = async () => {
    if (!userId) return;
    const addresses = await api.get(`/address`);
    setAddresses(addresses.data);
  }

  useEffect(() => {
    const fetchData = async () => {
      await loadUser();
      await loadAddress();
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleAddAddress = () => {
    navigate("/add-address");
  };

  const handleEditAddress = (address) => {
    navigate("/add-address", { state: address });
  };

  const handleDeleteAddress = async (id) => {
    try {
      await api.delete(`/address/${id}`);
      setAddresses((prev) => prev.filter((addr) => addr._id !== id));
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  if (loading) {
    return <ProfileSkeleton />;
  }

  const logout = () => {
    localStorage.clear();
    setUser(null);
    navigate("/login");
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* 🔹 USER INFO */}
      <div className="bg-white p-6 rounded-2xl shadow max-w-3xl mx-auto">

        <h2 className="text-2xl font-semibold mb-6 text-center md:text-left">
          My Profile
        </h2>

        {/* Profile Top */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">

          {/* Avatar */}
          <div className="w-20 h-20 rounded-full bg-linear-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold">
            {user?.name?.trim().charAt(0).toUpperCase()}
          </div>

          {/* Info */}
          <div className="text-center md:text-left space-y-1">
            <p><span className="font-medium">Name:</span> {user?.name?.charAt(0).toUpperCase() + user?.name?.slice(1)}</p>
            <p><span className="font-medium">Email:</span> {user?.email}</p>
            <p className="text-sm text-gray-500">
              Joined: {new Date(user?.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* 🔹 ACTION BUTTONS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">

          <button onClick={() => navigate("/edit-profile")} className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition">
            Edit Profile
          </button>

          <button onClick={() => navigate("/orders")} className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg transition">
            My Orders
          </button>

        </div>
      </div>

      {/* 🔹 ADDRESS LIST */}
      <div className="max-w-3xl mx-auto mt-8">
        <AddressList
          addresses={addresses}
          onAdd={handleAddAddress}
          onEdit={handleEditAddress}
          onDelete={handleDeleteAddress}
        />
      </div>

      <div className="max-w-3xl mx-auto mt-6">
        <button
          onClick={logout}
          className="w-full border border-red-500 text-red-500 hover:bg-red-500 hover:text-white py-3 rounded-lg transition"
        >
          Logout
        </button>
      </div>

    </div>
  );
}

export default Profile