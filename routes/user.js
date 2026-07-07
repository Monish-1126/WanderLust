const express= require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveUrl } = require("../middleware.js");
const userController = require("../controllers/user");

router.get("/signup", userController.renderSignup);

router.post(
    "/signup",
    wrapAsync(userController.signup)
);

router.get("/login", userController.renderLogin);

router.post(
    "/login",
    saveUrl,
    passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: true,
    }),
    userController.login
);

router.get("/logout", userController.logout);

module.exports = router;