const Household = require('../models/Household')
const RentYear = require('../models/RentYear')

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
    const rentItem = req.body.rentItem;
    console.log(rentItem)
    const household = await Household.findOne({ users: user._id }).populate('rentYears');
    let rentYear = await RentYear.find({household});
    rentYear = rentYear[rentYear.length - 1];
    rentYear.rentMonths.at(-1).rentItems.push(rentItem);
    rentYear.rentMonths.at(-1).rentTotal += parseInt(rentItem.cost);
    rentYear.yearlyTotal += parseInt(rentItem.cost);
    await rentYear.save();

    res.redirect('/living-expenses');
}