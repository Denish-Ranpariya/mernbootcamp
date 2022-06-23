const User = require("../models/user");
const { validationResult } = require("express-validator");

exports.signup = (req, res) => {
    const errors = validationResult(req);
    const user = new User(req.body);

    if (!errors.isEmpty()) {
        return res
            .status(422)
            .json({ error: errors.array()[0].msg, param: errors.array()[0].param });
    }

    user.save((err, user) => {
        if (err) {
            return res.status(400).json({
                err: "not able to save user in DB",
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
