//const crypto = require('crypto');

require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const connection = require('./config/database');
const port = process.env.PORT;


const userController = require('./app/controllers/user.controller');
const themeController = require('./app/controllers/theme.controller');
const cardController = require('./app/controllers/card.controller');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }))


app.use('/user', userController);
app.use('/themes', themeController);
app.use('/cards', cardController);






connection();



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});