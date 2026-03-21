import express from "express";
import {
    getAllUsers,
    getUserById,
    updateUserProfile
} from "../controllers/userController.js";

const router = express.Router();

//Route to get all users
router.get("/", getAllUsers);

//Route to get user by ID
router.get("/:id", getUserById);

//Route to update user profile
router.put("/:id", updateUserProfile);