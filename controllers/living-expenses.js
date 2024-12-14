const Household = require('../models/Household')
const RentYear = require('../models/RentYear')
const { getCurrentMonth, getCurrentYear } = require('../utils/getCurrentDate');

module.exports.renderLivingExpenses = async (req, res) => {
    const user = req.user;
    const household = await Household.findOne({ users: user._id }).populate('rentYears');
    if (!household) {
        req.flash('error', 'You are not a part of any Household!');
        return res.redirect('/home');
    }

    res.render('living-expenses/index', { household, page_name: 'Living Expenses' });
}

module.exports.createLivingExpense = async (req, res) => {
    const user = req.user;
    rentItem = req.body.rentItem;
    const household = await Household.findOne({ users: user._id }).populate('rentYears');
    const rentYear = await RentYear.findOne({household: household._id});
    rentYear.rentMonths.at(-1).rentItems.push(rentItem);
    rentYear.rentMonths.at(-1).rentTotal += parseInt(rentItem.cost);
    rentYear.yearlyTotal += parseInt(rentItem.cost);
    rentYear.save();

    res.redirect('/living-expenses');
}