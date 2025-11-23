class KycController {
    async submitKyc(req, res) {


        
        // KYC submission logic here
        res.status(200).json({ message: "KYC submitted successfully" });



    }
}

export default new KycController();