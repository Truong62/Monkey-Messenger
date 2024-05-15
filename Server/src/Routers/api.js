const express = require("express");
// const isAuthenticated = require("../middlewares/isAuthenticated")

const {
    postUser,
    sendGmail
} = require("../Controller/usersController")

const routerAPI = express.Router();

routerAPI.post("/createUser", postUser)
routerAPI.post("/sendEmail", sendGmail)

module.exports = routerAPI;