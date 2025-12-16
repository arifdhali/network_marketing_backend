import { Router } from "express";
import Wallet_transction from "../controller/Wallet_transction.controller.js";
import Wallet from "../controller/Wallet.controller.js";
const router_wallet = Router();


router_wallet.get("/", Wallet_transction.getAllWalletTransactions);
router_wallet.get("/wallet", Wallet.getCurrentBalance);

export default router_wallet;  