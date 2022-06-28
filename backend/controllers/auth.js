const User = require("../models/user");
const { validationResult } = require("express-validator");
var jwt = require('jsonwebtoken');
var expressjwt = require("express-jwt");

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

    res.clearCookie("token");
    res.json({
        message: "User signed out successfully",
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

    User.findOne({ "email": email }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                "err": "Not able to find user with given email in DB",
            });
        }

        if (!user.authenticate(password)) {
            return res.status(401).json({
                "err": "Email and password do not match.",
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

//protected routes
exports.isSignedIn = expressjwt({
    secret: process.env.SECRET,
    userProperty: "auth"
});

exports.isAutheticated = (req, res, next) => {
    let checker = req.profile && req.auth && req.profile._id === req.auth._id;
    if (!checker) {
        return res.status(403).json({
            error: "ACCESS DENIED",
        });
    }
    next();
};

exports.isAdmin = (req, res, next) => {
    if (req.profile.role === 0) {
        return res.status(403).json({
            error: "You are not an ADMIN, ACCESS DENIED",
        });
    }
    next();
};


//custom middlewares
