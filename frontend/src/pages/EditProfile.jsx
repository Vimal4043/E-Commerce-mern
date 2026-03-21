import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import api from "../api/axios";

const EditProfile = () => {
    const userId = localStorage.getItem("userId");
    const [user, setUser] = useState(null)
    const navigate = useNavigate();

    const [name, setName] = useState("");

    const loadUser = async () => {
        if (!userId) return;
        try {
            const res = await api.get(`/user/${userId}`);
            const data = res.data;
            setUser(data);
        } catch (error) {
            console.error("Failed to load user:", error);
        }
    }

    useEffect(() => {
        loadUser();
    }, [userId]);

    useEffect(() => {
        setName(user?.name || "");
    }, [user]);

    const handleChange = (e) => {
        if (e.target.name === "name") {
            //Only allow letters and space in name
            if (!/^[A-Za-z ]*$/.test(e.target.value)) return;
        }

        setName(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Update user (frontend only for now)
        const updatedUser = { ...user, name };
        await api.put(`/user/${userId}`, { name });
        setUser(updatedUser);

        // Go back to profile
        navigate("/profile");
    };

    if (!user) {
        return <div className="max-w-xl mx-auto p-6">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
            <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-lg">

                {/* Title */}
                <h2 className="text-2xl font-semibold mb-6 text-center">
                    Edit Profile
                </h2>

                {/* Avatar */}
                <div className="flex justify-center mb-4">
                    <div className="w-20 h-20 rounded-full bg-linear-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold">
                        {user.name?.charAt(0).toUpperCase()}
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* Name */}
                    <div>
                        <label className="block text-sm mb-1 font-medium">Name</label>
                        <input
                            name="name"
                            type="text"
                            value={name}
                            onChange={handleChange}
                            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your name"
                            required
                        />
                    </div>

                    {/* Email (read-only) */}
                    <div>
                        <label className="block text-sm mb-1 font-medium">Email</label>
                        <input
                            type="email"
                            value={user?.email}
                            disabled
                            className="w-full border rounded-lg px-3 py-2 bg-gray-100 text-gray-500 cursor-not-allowed"
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3 pt-2">

                        <button
                            type="submit"
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition font-medium"
                        >
                            Save Changes
                        </button>

                        <button
                            type="button"
                            onClick={() => navigate("/profile")}
                            className="flex-1 border border-gray-300 hover:bg-gray-100 py-2 rounded-lg transition"
                        >
                            Cancel
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default EditProfile;