const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/userAuthentication');

const { index, getCardsByTheme, newCard, show, compareCard } = require('../models/card.model');

router.get('/', authenticateToken, index);
router.get('/:id', authenticateToken, getCardsByTheme);
router.get('/single/:id', authenticateToken, show);



router.post('/new/:id', authenticateToken, newCard);
router.post('/compare/:id', authenticateToken, compareCard);

module.exports = router;