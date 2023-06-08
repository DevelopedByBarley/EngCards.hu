const mysql = require('mysql2');


const mongoose = require('mongoose');
function connection() {

    // Csatlakozás a MongoDB adatbázishoz
    mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log('Database is connected successfully');
            // Innentől folytathatod az alkalmazás fejlesztését
        })
        .catch((err) => {
            console.error('Database connection error:', err);
        });
}

module.exports = connection;