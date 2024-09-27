const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rentItemSchema = new Schema({
    reason: {
        type: String,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    desc: String,
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('RentItem', rentItemSchema);