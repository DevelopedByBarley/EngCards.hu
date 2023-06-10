const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cardSchema = new Schema({
    word: {
        type: String,
        required: true,
        unique: true
    },
    translate: {
        type: String,
        required: true,
        unique: true
    },
    expiresIn: {
        type: String,
        required: true,
    },
    state: {
        type: Number,
        default: 1,
        required: true
    },
    isForRepeat: {
        type: Boolean,
        default: false,
        required: true
    },
    imageName: {
        type: String,
    },
    userRefId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    }
}, { timestamps: true });

module.exports = mongoose.model('Card', cardSchema);