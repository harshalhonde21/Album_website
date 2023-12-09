import express from "express";
import { login, signup, getUser } from "../Controller/UserController.js";

const router = express.Router();
router.post("/signup", signup);
router.post("/login", login);
router.get("/getUser", getUser);

export default router;
