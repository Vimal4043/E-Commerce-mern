import express from "express";
import { signupUser } from "../controllers/Auth/signup/signup.js";
import { loginUser } from "../controllers/Auth/login/login.js";

const router = express.Router();

router.post("/signup", signupUser);
router.post("/login", loginUser);

export default router;