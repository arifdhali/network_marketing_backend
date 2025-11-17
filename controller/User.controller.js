import USER_MODEL from "../models/User.js";
import { RegisterUserSchema } from "../validations/User.validation.js";
class UserController {


    async registerUser(req, res) {

        try {


            await RegisterUserSchema.validateAsync(req.body, { abortEarly: false });

            const { name, email, mobile, sponsor_id, password } = req.body;

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
                    sponsor_id
                }
            })

            if (created) {
                // sending email logic here


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


}


export default new UserController();

