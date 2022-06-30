const User = require("../models/user");

exports.getUserbyId = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                "error": "No user found in DB",
            });
        }

        req.profile = user;
        next();
    });
}

exports.getUser = (req, res) => {
    req.profile.salt = undefined;
    req.profile.encry_password = undefined;
    return res.json(req.profile);
}

exports.getAllUsers = (req, res) => {
    User.find({}, (err, users) => {
        if (err || !users) {
            return res.status(400).json({
                "error": "Not able to fetch all users!!"
            });
        }
        return res.status(200).json(users);
    })
}