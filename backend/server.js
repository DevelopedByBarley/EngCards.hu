//const crypto = require('crypto');

require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const connection = require('./config/database');
const port = process.env.PORT;


const userController = require('./app/controllers/user.controller');
const themeController = require('./app/controllers/theme.controller');
const cardController = require('./app/controllers/card.controller');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(express.static(__dirname + '/public'))


app.use('/user', userController);
app.use('/themes', themeController);
app.use('/cards', cardController);


if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, '../', 'frontend', 'build')));
    app.get('*', (req, res) => { res.sendFile(path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')); });
  }



connection();



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});