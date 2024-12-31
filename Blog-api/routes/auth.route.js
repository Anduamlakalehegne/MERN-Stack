import express from "express";
import { signIn, signOut, signUp } from "../controller/auth.controller.js";
import { uploadMiddleware } from "../middleware/uploadHandler.js";

export const authRoute = express.Router();

authRoute.use(uploadMiddleware.single("profile"));

authRoute.post("/sign-up", signUp);
authRoute.post("/sign-in", signIn);
authRoute.post("/sign-out", signOut);
