import Admin_modes from "../models/Admin.js";
import User from "../models/User.js";
import { LoginAdminSchema } from "../validations/Admin.validation.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";

class AdminController {

    async loginAdmin(req, res) {
        try {
            await LoginAdminSchema.validateAsync(req.body, { abortEarly: false });

            const { email, password } = req.body;
            const hashedPassword = crypto.createHash(`${process.env.CRYPTO_HASH_ALGO}`).update(password).digest("hex");
            const admindata = await Admin_modes.findOne({ where: { email, password: hashedPassword } })


            if (!admindata) {
                return res.status(401).json({
                    status: false,
                    message: "Invalid email or password"
                });
            }
            const user = {
                type:"admin",
                id: admindata.id,
                email: admindata.email,
                role: admindata.role
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

    // get users

    async getUsers(req, res) {


        try {



            const { count, rows } = await User.findAndCountAll({
                attributes: ["id", "username", "email", "refer_id", "position", "plan_id", "status"],
                raw: true
            })
            if (rows.length >= 1) {
                return res.status(200).json({
                    status: true,
                    users: rows,
                    total_count: count
                })
            }

        } catch (error) {

            return res.json({
                status: false,
                message: error.message
            })

        }

    }


}

export default new AdminController();