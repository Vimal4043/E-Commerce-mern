import express from "express";
import {
    getAllUsers,
    getUserById,
    updateUserProfile
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

//Route to get all users
router.get("/", protect, getAllUsers);

//Route to get user by ID
router.get("/:id", protect, getUserById);

//Route to update user profile
router.put("/:id", protect, updateUserProfile);

export default router;