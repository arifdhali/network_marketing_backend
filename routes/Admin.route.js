import { Router } from "express";
import AdminController from "../controller/Admin.controller.js";
import { verifyToken } from "../middleware/VerifyAuth.js";
const router = Router();

router.post("/login", AdminController.loginAdmin)

export default router;