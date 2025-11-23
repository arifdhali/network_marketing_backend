import express from "express";
import KycUser from "../controller/Kyc.controller.js";
import { verifyToken } from "../middleware/VerifyAuth.js";
import  createKYCUploadHandle  from "../middleware/KycUpload.js";


const kycRouter = express.Router();

const kycUpload_multer = createKYCUploadHandle({
    destination: "uploads/kyc",
    maxSize: 3 * 1024 * 1024,
    fields: [
        { name: 'front_image_url', maxCount: 1 },
        { name: 'back_image_url', maxCount: 1 },
    ]
});

kycRouter.post("/submit", verifyToken, kycUpload_multer, KycUser.submitKyc)

export default kycRouter;