const { rentItemSchema } = require('./schemas');
const RentYear = require('./models/RentYear');
const ExpressError = require('./utils/ExpressError');
const { getCurrentMonth, getCurrentYear } = require('./utils/getCurrentDate');
const Household = require('./models/Household');

module.exports.validateRentItem = (req, res, next) => {
    const { error } = rentItemSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    }
    return next();
}

module.exports.checkCurrentYear = async (req, res, next) => {
    const household = await Household.findOne({ users: req.user._id });
    const rentYear = await RentYear.findOne({ year: getCurrentYear(), household: household });
    if (!rentYear) {
        const newYear = new RentYear({
            year: getCurrentYear(),
            household,
        });
        household.rentYears.push(newYear);
        household.save();
        newYear.save();
    }
    return next();
}

module.exports.checkCurrentMonth = async (req, res, next) => {
    const household = await Household.findOne({ users: req.user._id });
    const currentMonth = await RentYear.findOne({ 'rentMonths.month': getCurrentMonth() , household: household._id });
    if (!currentMonth) {
        const currentYear = await RentYear.findOne({ year: getCurrentYear(), household: household });
        const newMonth = {
            year: getCurrentYear(),
            month: getCurrentMonth(),
            rentItems: [],
            rentTotal: 0
        }
        currentYear.rentMonths.push(newMonth);
        currentYear.save();
    };
    return next();
}

module.exports.storeReturnTo = (req, res, next) => {
    if (req.session.returnTo) {
        res.locals.returnTo = req.session.returnTo;
    }
    return next();
}

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        req.flash('error', 'You must be signed in');
        return res.redirect('/login');
    }
    return next();
}

module.exports.checkHousehold = async (req, res, next) => {
    if (req.isAuthenticated()) {
        const household = await Household.findOne({ users: req.user._id })
        if (!household) {
            return res.redirect('/household/new');
        }
    }
    return next();
}

module.exports.isHouseholdUser = async(req, res, next) => {
    const { id } = req.params;
    const household = await Household.findById(id);
    if (!household.users.includes(req.user._id)) {
        req.flash('error', 'You do not have permission to do that!')
        return res.redirect(`/home`)
    }
    next();
}

// module.exports.hasHousehold = async(req, res, next) => {
//     const {id} = req.params;
//     const household = await Household.findById(id);
//     if (!household) {
//         req.flash('error', 'You need to finish creating a Household!')

//     }
// }