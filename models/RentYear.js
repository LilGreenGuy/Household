const mongoose = require('mongoose');
const RentMonth = require('./models/rent-month');
const Schema = mongoose.Schema;

const rentYearSchema = new Schema({
    year: Number,
    rentMonths: [{
        type: Schema.Types.ObjectId,
        ref: 'RentMonth'
    }]
});

module.exports = mongoose.model('RentYear', rentYearSchema);