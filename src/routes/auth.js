const express = require("express");
const router = express.Router();
const { register } = require("../controllers/authController");

// ki ykoun fama POST 3ala /register, n3aytou lel fonction register
router.post("/register", register);

module.exports = router;
