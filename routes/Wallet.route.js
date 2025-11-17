import { Router } from "express";
import Wallet_transction from "../controller/Wallet_transction.controller.js";
const router_wallet = Router();


router_wallet.post("/", Wallet_transction.registerrUser);

export default router_wallet;  