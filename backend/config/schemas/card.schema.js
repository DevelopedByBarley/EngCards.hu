const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cardSchema = new Schema({
    word: {
        type: String,
        required: true,
        unique: true
    },
    wordInHun: {
        type: String,
        required: true,
        unique: true
    },
    expiresIn: {
        type: Date,
        required: true
    },
    state: {
        type: Number,
        default: 1,
        required: true
    },
    userRefId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('Card', cardSchema);