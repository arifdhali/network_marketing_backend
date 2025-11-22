import Admin_modes from "../models/Admin.js";
import { LoginAdminSchema } from "../validations/Admin.validation.js";
import jwt from "jsonwebtoken";

class AdminController {

    async loginAdmin(req, res) {
        try {
            await LoginAdminSchema.validateAsync(req.body, { abortEarly: false });

            const { email, password } = req.body;
            const admindata = await Admin_modes.findOne({ where: { email, password: password } })

            const user = {
                id: admindata.id,
                email: admindata.email,
                role: admindata.role
            }
            if (!admindata) {
                return res.status(401).json({
                    status: false,
                    message: "Invalid email or password"
                });
            }
            let token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
            return res.status(200).json({
                status: true,
                message: "Login successful",
                token: token,
            });


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
            return res.status(500)
                .json(
                    {
                        status: false,
                        message: error.message
                    }
                );
        }
    }


}

export default new AdminController();