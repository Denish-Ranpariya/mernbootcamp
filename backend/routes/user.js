const express = require("express");
const router = express.Router();

const { getUserbyId, getUser, getAllUsers } = require("../controllers/user");
const { isSignedIn, isAutheticated, isAdmin } = require("../controllers/auth");

router.param("userId", getUserbyId);

router.get("/user/:userId", isSignedIn, isAutheticated, getUser);

router.get("/users", getAllUsers);

module.exports = router;



