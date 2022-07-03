const { response } = require("express");
const User = require("../models/user");
const Order = require("../models/order");

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

exports.updateUser = (req, res) => {
    const profile = req.profile;
    User.findByIdAndUpdate(profile._id, new User(req.body), { useFindAndModify: false, new: true }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                "err": "No user found in DB",
            });
        }
        user.salt = undefined;
        user.encry_password = undefined;
        return res.status(200).json(user);
    });
}

exports.userPurchaseList = (req, res) => {
    Order.find({ user: req.profile._id })
        .populate("user", "_id name")
        .exec((err, order) => {
            if (err) {
                return res.status(400).json({
                    error: "No order associated with this user",
                });
            }
            return res.status(200).json(order);
        })
};