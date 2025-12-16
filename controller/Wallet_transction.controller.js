import Wallet_transaction from "../models/Wallet_transction.js"

class Wallet_transctionController {


    async getAllWalletTransactions(req, res) {
        const { user_id } = req.body;
        try {
            if (!user_id) throw new Error("user_id is required");

            const transction = await Wallet_transaction.findAll({ where: { user_id }, order: [['createdAt', 'DESC']] });
            if (transction.length > 0) {
                return res.status(200).json({
                    status: true,
                    transaction: transction
                });
            }
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: error.message
            });
        }


    }

    async getWithdrawTransactions(req, res) {
        const { user_id } = req.body


    }
}


export default new Wallet_transctionController();

