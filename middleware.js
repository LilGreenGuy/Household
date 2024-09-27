const { rentItemSchema } = require('./schemas');
const ExpressError = require('./utils/ExpressError');

module.exports.validateRentItem = (req, res, next) => {
    const { error } = rentItemSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    }
    next();
}