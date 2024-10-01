const { rentItemSchema } = require('./schemas');
const RentMonth = require('./models/RentMonth');
const ExpressError = require('./utils/ExpressError');
const { getCurrentMonth, getCurrentYear } = require('./utils/getCurrentDate');

module.exports.validateRentItem = (req, res, next) => {
    const { error } = rentItemSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    }
    next();
}

module.exports.checkCurrentMonth = async (req, res, next) => {
    const rentMonth = await RentMonth.findOne({ month: getCurrentMonth() });
    if (!rentMonth) {
        const newMonth = new RentMonth({
            year: getCurrentYear(),
            month: getCurrentMonth(),
            rentItems: []
        })
        newMonth.save();
    }
    next();
}