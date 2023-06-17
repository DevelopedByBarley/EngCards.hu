const express = require('express');
const router = express.Router();
const userAuthentication = require('../middleware/userAuthentication')
const { registerUser, loginUser, getMe, token } = require('../models/user.model')

router.get('/getMe', userAuthentication, getMe);
router.get('/token', token);

router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;