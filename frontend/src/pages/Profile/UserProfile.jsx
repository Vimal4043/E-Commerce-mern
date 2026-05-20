import React from 'react'
import { useNavigate } from 'react-router-dom';

const UserProfile = ({ user, logout }) => {

    const navigate = useNavigate();

    return (
        <div className="bg-white p-6 rounded-2xl shadow max-w-3xl mx-auto">

            <div className='flex'>
                <h2 className="text-2xl font-semibold mb-6 text-center md:text-left">
                    My Profile
                </h2>
                <button
                    onClick={logout}
                    className="ml-auto border border-red-500 text-red-500 hover:bg-red-500 hover:text-white py-2 px-4 rounded-lg transition"
                >
                    Logout
                </button>
            </div>

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
    )
}

export default UserProfile