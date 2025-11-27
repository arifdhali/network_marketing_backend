import { Router } from "express";
import AdminController from "../controller/Admin.controller.js";
import { verifyToken } from "../middleware/VerifyAuth.js";
import AuthRoles from "../middleware/AuthRoles.js";
import KycController from "../controller/Kyc.controller.js";
const router = Router();

router.post("/login", AdminController.loginAdmin);
router.get("/users", verifyToken, AuthRoles("admin"), AdminController.getUsers);
router.patch("/users/kyc/approve", verifyToken, AuthRoles("admin"), KycController.checkingKyc)

export default router;