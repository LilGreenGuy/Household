const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rentMonthSchema = new Schema({
    year: Number,
    month: String,
    rentItems: [
        {
            type: Schema.Types.ObjectId,
            ref: 'RentItem'
        }
    ],
    rentTotal: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('RentMonth', rentMonthSchema);