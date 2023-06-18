const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/userAuthentication');

const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './backend/public/images')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})
const upload = multer({ storage: storage })


const { index, getCardsByTheme, newCard, show, compareCard } = require('../models/card.model');

router.get('/', authenticateToken, index);
router.get('/:id', authenticateToken, getCardsByTheme);
router.get('/single/:id', authenticateToken, show);



router.post('/new/:id', authenticateToken, upload.single('image'), newCard);
router.post('/compare/:id', authenticateToken, compareCard);

module.exports = router;