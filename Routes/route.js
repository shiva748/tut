const express = require('express');
const router = express.Router();
const { get, register, login } = require('../controller/controller');

router.get('/', get);

router.post("/register", register);

router.post("/login", login)
// Define other routes here

module.exports = router;