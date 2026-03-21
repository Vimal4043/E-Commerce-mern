import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import api from "../api/axios";

const EditProfile = () => {
    const userId = localStorage.getItem("userId");
    const [user, setUser] = useState(null)
    const navigate = useNavigate();

    const [name, setName] = useState(user?.name || "");

    const loadUser = async () => {
        if (!userId) return;
        try {
            const res = await api.get(`/user/${userId}`);
            const data = await res.data;
            setUser(data);
        } catch (error) {
            console.error("Failed to load user:", error);
        }
    }

    useEffect(() => {
        loadUser();
    }, [userId]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Update user (frontend only for now)
        const updatedUser = { ...user, name };
        await api.put(`/user/${userId}`, { name });
        setUser(updatedUser);

        // Go back to profile
        navigate("/profile");
    };

    if(!user) {
        return <div className="max-w-xl mx-auto p-6">Loading...</div>;
    }

    return (
        <div className="max-w-xl mx-auto p-6">
            <div className="bg-white p-6 rounded-xl shadow">
                <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>

                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* Name */}
                    <div>
                        <label className="block text-sm mb-1">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full border rounded-lg px-3 py-2"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <p className="text-gray-600">{user?.email}</p>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                        >
                            Save
                        </button>

                        <button
                            type="button"
                            onClick={() => navigate("/profile")}
                            className="border px-4 py-2 rounded-lg"
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