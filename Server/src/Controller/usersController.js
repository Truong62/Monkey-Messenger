const path = require('path');
const {
    createUser,
    sendEmail,

} = require("../Services/UserServices")

module.exports = {
    postUser: async (req, res) => {
        const data = req.body

        // if
        // console.log(data)
        const result = await createUser(data)
        return res.status(200).json({
            EC: 0,
            data: result
        })
    },
    sendGmail: async (req, res) => {
        const { email } = req.body
        const result = await sendEmail(email)
        console.log(result)
        return res.status(200).json({
            EC: 0,
            data: result
        })
    }
}