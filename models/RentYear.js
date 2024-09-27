const mongoose = require('mongoose');
const RentMonth = require('./models/rent-month');
const Schema = mongoose.Schema;

const rentMonthSchema = new Schema({
    year: Number,
    month: String,
    rentItems: [{
        type: Schema.Types.ObjectId,
        ref: 'RentMonth'
    }]
});

module.exports = mongoose.model('RentMonth', rentMonthSchema);