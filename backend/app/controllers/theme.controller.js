const express = require('express');
const router = express.Router();
const userAuthentication = require('../middleware/userAuthentication')
const { index, show, newTheme, deleteTheme, updateTheme } = require('../models/theme.model');


router.get('/', userAuthentication, index);
router.get('/:id', userAuthentication, show);
router.post('/new', userAuthentication, newTheme);
router.delete('/:id', userAuthentication, deleteTheme);
router.put('/:id', userAuthentication, updateTheme);



module.exports = router;