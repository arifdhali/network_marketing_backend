import { Router } from "express";
import UserController from "../controller/User.controller.js";
import kycRouter from "./Kyc.route.js";
import { verifyToken } from "../middleware/VerifyAuth.js";
const router = Router();


router.post("/login", (req, res) => {
    UserController.loginUser(req, res);
});
router.post("/register", (req, res) => {
    UserController.registerUser(req, res);
});

// all kyc routes
router.use("/kyc",verifyToken,  kycRouter);


export default router;