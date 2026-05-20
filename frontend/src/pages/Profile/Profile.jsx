import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import AddressList from '../../components/Address/AddressList';
import ProfileSkeleton from '../../loadingSkeleton/ProfileSkeleton';
import UserProfile from './UserProfile';

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
      <UserProfile user={user} />

      {/* 🔹 ADDRESS LIST */}
      <div className="max-w-3xl mx-auto mt-8">
        <AddressList
          addresses={addresses}
          onAdd={handleAddAddress}
          onEdit={handleEditAddress}
          onDelete={handleDeleteAddress}
        />
      </div>

    </div>
  );
}

export default Profile