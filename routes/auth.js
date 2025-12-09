/** @format */

import { registerUser } from "../controllers/registerUser.js";
import { loginUser } from "../controllers/loginUser.js";
import { getCurrentUser } from "../controllers/getCurrentUser.js";
import express from "express";

export const authRouter = express.Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.get("/me", getCurrentUser);
