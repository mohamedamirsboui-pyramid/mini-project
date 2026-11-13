const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");

// ki ykoun fama POST 3ala /register, n3aytou lel fonction register
router.post("/register", register);
router.post("/login", login);

module.exports = router;
