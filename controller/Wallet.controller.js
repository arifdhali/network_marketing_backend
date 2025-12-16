import Wallet from "../models/Wallet.js";
class Wallet_controller {


    async getCurrentBalance(req, res) {
        const { user_id } = req.body;
        try {
            if (!user_id) throw new Error("user_id is required");
            let currentBalance = await Wallet_transaction.sum('amount', {
                where: {
                    user_id: user_id,
                }
            });
            console.log(currentBalance)
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: error.message
            });
        }
    }
}

export default new Wallet_controller();