import express from "express";
import { getAllUsers } from "../controllers/User/read/GetAllUsers.js";
import { getUserById } from "../controllers/User/read/GetUserById.js";
import { updateUserProfile } from "../controllers/User/update/UpdateUserProfile.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

//Route to get all users
router.get("/", protect, getAllUsers);

//Route to get user by ID
router.get("/:id", protect, getUserById);

//Route to update user profile
router.put("/:id", protect, updateUserProfile);

export default router;