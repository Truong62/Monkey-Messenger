
const bcrypt = require('bcrypt');
const User = require('../Model/UserModel');
const nodemailer = require('nodemailer');
require('dotenv').config();


module.exports = {
    createUser: async (data) => {
        try {
            let { email, name, birthDate, address, phone, password } = data

            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(password, salt);

            const result = await User.create({
                name,
                gamil: email,
                password: hashedPassword,
                avatar: "avatar.png",
                address,
                phone,
                birthday: birthDate
            })
            if (!result) {
                return null
            }
            return result
        } catch (error) {
            console.log(error)
            return null
        }
    },
    sendEmail: async (email) => {
        const randomNumber = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
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
            to: email,
            subject: 'Monkey App',
            html: `<h3>Hello,</h3> <br> <p>Code: ${randomNumber}</p>`
        }
        await transporter.sendMail(message)
        return randomNumber
    }
}