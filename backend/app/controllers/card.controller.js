const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/userAuthentication');

const { index, newCard } = require('../models/card.model');

router.get('/', authenticateToken, index);
router.get('/new', authenticateToken, newCard);

module.exports = router;