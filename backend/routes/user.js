const express = require("express");
const router = express.Router();

const { getUserbyId, getUser, updateUser, userPurchaseList } = require("../controllers/user");
const { isSignedIn, isAutheticated, isAdmin } = require("../controllers/auth");

router.param("userId", getUserbyId);

router.get("/user/:userId", isSignedIn, isAutheticated, getUser);

router.put("/user/:userId", isSignedIn, isAutheticated, updateUser);

router.get("/user/:userId/orders", isSignedIn, isAutheticated, userPurchaseList);

module.exports = router;



