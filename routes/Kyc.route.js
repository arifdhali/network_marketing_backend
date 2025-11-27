import express from "express";
import KycUser from "../controller/Kyc.controller.js";
import { verifyToken } from "../middleware/VerifyAuth.js";
import createKYCUploadHandle from "../middleware/KycUpload.js";


const kycRouter = express.Router();

const kycUpload_multer = createKYCUploadHandle({
    destination: "uploads/kyc",
    maxSize: 2 * 1024 * 1024,
    fields: [
        { name: 'front_image', maxCount: 1 },
        { name: 'back_image', maxCount: 1 },
        { name: 'selfie_image', maxCount: 1 },
    ]
});

kycRouter.post("/submit", kycUpload_multer, KycUser.submitKyc);
kycRouter.get("/", KycUser.getKycInformations);



export default kycRouter;