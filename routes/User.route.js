import { Router } from "express";
import UserController from "../controller/User.controller.js";
import kycRouter from "./Kyc.route.js";
import { verifyToken } from "../middleware/VerifyAuth.js";
import AuthRoles from "../middleware/AuthRoles.js";
const router = Router();


router.post("/login", (req, res) => {
    UserController.loginUser(req, res);
});
router.post("/register", (req, res) => {
    UserController.registerUser(req, res);
});

// all kyc routes
router.use("/kyc", verifyToken, AuthRoles("user"), kycRouter);


export default router;