const mongoose = require('mongoose');
const RentItem = require('./RentItem');
const Schema = mongoose.Schema;

const rentMonthSchema = new Schema({
    year: Number,
    month: String,
    rentItems: [
        {
            type: Schema.Types.ObjectId,
            ref: 'RentItem'
        }
    ]
});

module.exports = mongoose.model('RentMonth', rentMonthSchema);