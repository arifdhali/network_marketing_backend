import { Router } from "express";
import AdminController from "../controller/Admin.controller.js";
import { verifyToken } from "../middleware/VerifyAuth.js";
import AuthRoles from "../middleware/AuthRoles.js";
const router = Router();

router.post("/login", AdminController.loginAdmin);
router.get("/users", verifyToken, AuthRoles("admins"), AdminController.getUsers)

export default router;