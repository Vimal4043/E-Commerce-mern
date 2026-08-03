import User from "../../../models/User.js";
import bcrypt from "bcryptjs";

export const changePassword = async (req, res) => {
    try {
        const { email, oldPassword, newPassword, confirmPassword } = req.body;

        const user = await User.findOne({ email: email.toLowerCase() });

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const match = await bcrypt.compare(oldPassword, user.password);

        if (!match) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        if (newPassword !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();

        res.json({ message: "Password changed successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};