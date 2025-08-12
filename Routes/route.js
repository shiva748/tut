const express = require('express');
const router = express.Router();
const { get, register } = require('../controller/controller');

router.get('/', get);

router.post("/register", register);

// Define other routes here

module.exports = router;