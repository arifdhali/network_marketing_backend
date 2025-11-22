import { Router } from "express";
import UserController from "../controller/User.controller.js";
const router = Router();


router.post("/login", (req, res) => {
    UserController.loginUser(req, res);
});
router.post("/register", (req, res) => {
    UserController.registerUser(req, res);
});


export default router;