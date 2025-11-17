import { Router } from "express";
import UserController from "../controller/User.controller.js";
const router = Router();



router.post("/register", (req, res) => {
    UserController.registerUser(req, res);
});


export default router;