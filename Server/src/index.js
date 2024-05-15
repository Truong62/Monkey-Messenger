const express = require("express");
const configDB = require("./Config/mongodbConfig")
const cors = require('cors');
require("dotenv").config();
const router = require("./Routers/api")
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const viewRoute = require("./routers/viewList")
// const configDB = require("./config/mongodbConfig");
// const fileUpload = require("express-fileupload")
// const path = require('path');

const app = express()
const port = 8000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
passport.use(new GoogleStrategy());
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');
// app.use(express.static(path.join(__dirname, 'public')));


// app.use(fileUpload())
app.use(cors());

app.use("/api", router);
// app.use("/list-order", viewRoute);

(async () => {
    try {
        await configDB()
        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`);
        });
    } catch (e) {
        console.log(e);
    }
})();