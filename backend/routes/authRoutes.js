import express from "express";
import { signupUser } from "../controllers/Auth/signup/signup.js";
import { loginUser } from "../controllers/Auth/login/login.js";
import { changePassword } from "../controllers/Auth/login/ChangePass.js";

const router = express.Router();

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/change-password", changePassword);

export default router;