const express = require('express');
const router = express.Router();
const userAuthentication = require('../middleware/userAuthentication')
const { index, show, newTheme } = require('../models/theme.model');


router.get('/', userAuthentication, index);
router.get('/:id', userAuthentication, show);
router.post('/new', userAuthentication, newTheme);




module.exports = router;