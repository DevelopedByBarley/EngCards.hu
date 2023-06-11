const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const themeSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    color: {
        type: String,
        required: true,
    },
    cards: [{
        type: Schema.Types.ObjectId,
        ref: 'Card',
    }],
    userRefId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    }
}, { timestamps: true });

module.exports = mongoose.model('Theme', themeSchema);

