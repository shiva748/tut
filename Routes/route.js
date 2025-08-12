const express = require('express');
const router = express.Router();
const { get, register, login, get_Profile } = require('../controller/controller');
const { verifytoken } = require('../middleware/auth');

router.get('/', get);

router.post("/register", register);

router.get("/profile", verifytoken, get_Profile);

router.post("/login", login)
// Define other routes here

module.exports = router;