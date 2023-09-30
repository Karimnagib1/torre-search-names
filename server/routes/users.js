const express = require("express");
const router = express.Router();
const { postLogin, postSignup } = require("../controllers/users");

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/signup", postSignup);

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", postLogin);

module.exports = router;
