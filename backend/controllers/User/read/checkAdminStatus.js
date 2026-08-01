import User from "../../../models/User.js";

export const checkAdminStatus = async (req, res) => {
  try {
    // req.user is set by the protect middleware
    const user = await User.findById(req.user.id).select('_id isAdmin email name');
    
    if (!user) {
      return res.status(404).json({ message: "User not found", isAdmin: false });
    }

    res.json({
      isAdmin: user.isAdmin,
      user: {
        id: user._id,
        email: user.email,
        name: user.name
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message, isAdmin: false });
  }
}