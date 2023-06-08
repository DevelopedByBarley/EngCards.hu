const express = require('express');
const router = express.Router();
const {registerUser, loginUser, token} = require('../models/user.model')


router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/token', token);

module.exports = router;