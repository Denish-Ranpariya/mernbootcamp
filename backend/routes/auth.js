const { Router } = require("express");
var express = require("express");
var router = express.Router();
const { signup, signout } = require("../controllers/auth");
const { check } = require('express-validator');

router.post("/signup",
    check('name').isLength({ min: 3 }).withMessage("Name should be atleast 3 characters long"),
    check('email').isEmail().withMessage("Email is required"),
    check('password').isLength({ min: 3 }).withMessage("Password should be atleast 3 characters long"),
    signup);

router.get("/signout", signout);

module.exports = router;