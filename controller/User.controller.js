import USER_MODEL from "../models/User.js";
import jwt from "jsonwebtoken";
import { RegisterUserSchema, LoginUserSchema } from "../validations/User.validation.js";
import crypto from "crypto";
import dotenv from "dotenv";
import User from "../models/User.js";
import { Op } from "sequelize";
import { sendMail } from "../utils/sendMail.js";
import Register from "../mail/template/Register.js";
dotenv.config();

class UserController {
    async loginUser(req, res) {
        try {
            await LoginUserSchema.validateAsync(req.body, { abortEarly: false });

            const { email, password } = req.body;
            const hashedPassword = crypto.createHash(`${process.env.CRYPTO_HASH_ALGO}`).update(password).digest("hex");

            const userdata = await USER_MODEL.findOne({ where: { email, password: hashedPassword } })

            if (!userdata) {
                return res.status(401).json({
                    status: false,
                    message: "Invalid email or password"
                });
            }
            const user = {
                id: userdata.id,
                type: "user",
                username: userdata.username,
                email: userdata.email,
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

    async registerUser(req, res) {

        try {
            await RegisterUserSchema.validateAsync(req.body, { abortEarly: false });

            const { name, email, mobile, refer_id, password } = req.body;

            let username = this.makeUsername(name, mobile);
            // crate username
            const [user, created] = await USER_MODEL.findOrCreate({
                where: { email },
                defaults: {
                    username,
                    password_hash: password,
                    name,
                    email,
                    mobile,
                    refer_id
                }
            })

            if (created) {
                // sending email logic here
                const mailData = {
                    to: email,
                    subject: `Welcome message`,
                    html: Register({
                        url: "http://localhost/login",
                        email,
                    }),

                }
                let mailstatus = await sendMail(mailData);
                console.log(mailstatus)
                return res.status(201).json(
                    {
                        status: true,
                        message: "User registered successfully",
                        user: {
                            id: user.id,
                            username: user.username,
                        }
                    }
                )
            } else {
                return res.status(409).json(
                    {
                        status: false,
                        message: "User with this email already exists"
                    }
                )
            }


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
            if (error.name === "SequelizeUniqueConstraintError") {
                return res.status(409).json({
                    status: false,
                    errors: error.errors.map(err => ({
                        field: err.path,
                        message: `${err.path} must be unique`
                    }))
                });
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
    // create usernameF
    makeUsername(name, mobile) {
        const namePart = name.trim().toLowerCase().slice(0, name.length / 2).replace(/\s+/g, "") + mobile.slice(0, mobile.length / 2);
        return namePart
    }


    // get users

    async getUsers(req, res) {
        try {
            const { name, email, mobile } = req.query;
            let where = {};
            if (name) {
                where.name = { [Op.like]: `%${name}%` };
            } else if (email) {
                where.email = { [Op.like]: `%${email}%` };
            } else if (mobile) {
                where.mobile = { [Op.like]: `%${mobile}%` };
            }
            const { count, rows } = await User.findAndCountAll({
                where: where,
                attributes: ["id", "username", "email", "refer_id", "position", "plan_id", "status"],
                raw: true
            })


            if (rows.length == 0) {
                return res.status(200).json({
                    status: true,
                    users: 0,
                    message: "No users found"
                })
            }
            else if (rows.length >= 1) {
                return res.status(200).json({
                    status: true,
                    users: rows,
                    total_count: count
                })
            }

        } catch (error) {
            console.log(error)
            return res.json({
                status: false,
                message: error.message
            })

        }

    }

}


export default new UserController();

