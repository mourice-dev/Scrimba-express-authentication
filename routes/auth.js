/** @format */

import { registerUser } from "../controllers/registerUser.js";
import express from "express";

export const authRouter = express.Router();

authRouter.post("/register", registerUser);
