const nodemailer = require('nodemailer');
require('dotenv').config();




// 
const sendGmail = async ({ gmail, subject, html }) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 567,
        secure: true,
        service: "Gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.PASSWORD
        }
    })

    const message = {
        from: "HACker",
        to: gmail,
        subject,
        html
    }

    const result = await transporter.sendMail(message)
    console.log(132)
    return result
}

module.exports = sendGmail