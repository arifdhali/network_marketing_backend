import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();


const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.GMAIL_NAME,
        pass: process.env.GMAIL_PASSWORD
    }

})


export const sendMail = async (information) => {
    try {

        await transporter.sendMail({
            from: ``,
            to: information.to,
            subject: information.subject,
            text:"Hello test",
            html: information.html,
        })
        return true;
    } catch (error) {
        console.log(error)
        return false
    }
}