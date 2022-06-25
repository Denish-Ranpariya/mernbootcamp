const User = require("../models/user");
const { validationResult } = require("express-validator");
var jwt = require('jsonwebtoken');
var { expressjwt: jwt } = require("express-jwt");

exports.signup = (req, res) => {

    const user = new User(req.body);
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res
            .status(422)
            .json({ error: errors.array()[0].msg, param: errors.array()[0].param });
    }

    user.save((err, user) => {
        if (err) {
            return res.status(400).json({
                err: "Not able to save user in DB",
            });
        }
        res.json({
            name: user.name,
            email: user.email,
            id: user._id,
        });
    });
};

exports.signout = (req, res) => {
    res.json({
        message: "User sign out",
    });
};

exports.signin = (req, res) => {
    const { email, password } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res
            .status(422)
            .json({ error: errors.array()[0].msg, param: errors.array()[0].param });
    }

    User.findOne({ email }, (err, user) => {
        if (err) {
            return res.status(400).json({
                err: "Not able to find user with given email in DB",
            });
        }

        if (!user.authenticate(password)) {
            return res.status(401).json({
                err: "Email and password do not match.",
            });
        }

        //create token
        const token = jwt.sign({ _id: user._id }, process.env.SECRET);

        //put token in cookie
        res.cookie("token", token, { expire: new Date() + 9999 });

        //send response to front end
        const { _id, name, email, role } = user;
        res.json({ token, user: { _id, name, email, role } });
    });
}

