//Require Packeage
const express = require("express");

// Controller
const { signup, signin, getUser, signout } = require("../controller/auth");

// Middelware
const authorization = require("../middleware/authorization");

//All Router For Sign Up & In
const router = express.Router();
router.post("/sign-up", signup);
router.post("/sign-in", signin);
router.get("/sign-out", authorization, signout);
router.get("/get-user", authorization, getUser);
module.exports = router;
