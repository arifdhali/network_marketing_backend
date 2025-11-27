import KYC_Model from "../models/Kyc.js";
import User from "../models/User.js";
import KycSchema from "../validations/Kyc.validation.js";

class KycController {
    async submitKyc(req, res) {
        const data = {
            ...req.body,
            front_image: req.files?.front_image,
            back_image: req.files?.back_image,
            selfie_image: req.files?.selfie_image,
        }
        try {

            await KycSchema.validateAsync(data, { abortEarly: false })
            const { document_type, user_id, document_number, front_image, back_image, selfie_image } = data;

            let inserted = await KYC_Model.create({
                user_id: user_id,
                document_type: document_type,
                doucment_number: document_number,
                front_image_url: front_image[0]?.filename,
                back_image_url: back_image[0]?.filename,
                selfie_image_url: selfie_image[0]?.filename,
            });
            res.status(200).json({ status: true, message: "KYC submitted successfully" });
        } catch (error) {
            if (error.isJoi) {
                return res.status(400).json(
                    {
                        status: false,
                        errors: error.details.map(item => ({
                            field: item.path[0],
                            message: item.message
                        }))
                    }
                )
            }
            return res.status(500).json(
                {
                    status: false,
                    message: error.message
                }
            );
        }
    }
    async checkingKyc(req, res) {
        const { user_id, req_status, reason } = req.body;
        try {
            const user = await KYC_Model.findOne({ where: { user_id } });

            if (!user) {
                return res.status(404).json({
                    status: false,
                    message: "KYC not found for this user",
                });
            }

            let update_data = { status: req_status };

            if (req_status === "rejected") {
                if (!reason) {
                    return res.status(400).json({
                        status: false,
                        message: "Reason is required when rejecting KYC",
                    });
                }
                update_data.reason = reason;
            }
            await KYC_Model.update(update_data, {
                where: { user_id },
            });

            return res.status(200).json({
                status: true,
                message: "KYC updated successfully",
            });

        } catch (error) {
            return res.status(500).json({
                status: false,
                message: error.message,
            });
        }
    }
    async getKycInformations(req, res) {
        try {
            const user_id = req.user.id;
            if (!user_id) {
                throw new Error("User id not found")
            }

            let user = await User.findOne({ where: { id: user_id } });
            if (!user) {
                return res.status(404).json({
                    status: false,
                    message: "User not found"
                });
            }
            let kyc = await KYC_Model.findOne({ where: { user_id: user_id } });
            console.log(kyc)
            if (!kyc) {
                return res.status(404).json({
                    status: false,
                    message: "KYC details not found for this user"
                });
            }

            res.json({
                status: true,
                kyc: {
                    apply_date: kyc.createdAt,
                    status: kyc.status,
                    reason: kyc.reason,
                    front_image: kyc.front_image,
                    back_image: kyc.back_image,
                    selfie_image: kyc.selfie_image
                }
            })
        } catch (error) {
            return res.json(
                {
                    status: false,
                    message: error.message
                }
            );
        }
    }
}

export default new KycController();