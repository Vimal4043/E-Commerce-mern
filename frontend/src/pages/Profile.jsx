import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import api from '../api/axios';
import AddressList from '../components/AddressList';

const Profile = () => {

  const userId = localStorage.getItem("userId");
  const [user, setUser] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const navigate = useNavigate();

  //Load user data
  const loadUser = async () => {
    if (!userId) return;
    const res = await api.get(`/users/${userId}`);
    setUser(res.data);
  };

  //Load user addresses
  const loadAddress = async () => {
    if (!userId) return;
    const res = await api.get(`/address/${userId}`);
    setAddresses(res.data);
  }

  useEffect(() => {
    loadUser();
    loadAddress();
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

  if (!userId) {
    navigate("/login");
    return null;
  }

  if(!user) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* USER INFO */}
      <div className="bg-white p-6 rounded-2xl shadow max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">My Profile</h2>

        <p><span className="font-medium">Name:</span> {user?.name}</p>
        <p><span className="font-medium">Email:</span> {user?.email}</p>
      </div>

      {/* ADDRESS LIST */}
      <div className="max-w-3xl mx-auto">
        <AddressList
          addresses={addresses}
          onAdd={handleAddAddress}
          onEdit={handleEditAddress}
          onDelete={handleDeleteAddress}
        />
      </div>

    </div>
  )
}

export default Profile