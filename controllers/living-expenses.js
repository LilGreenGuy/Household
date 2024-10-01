const RentItem = require('../models/RentItem');
const RentMonth = require('../models/RentMonth');
const { getCurrentMonth, getCurrentYear } = require('../utils/getCurrentDate');

module.exports.renderLivingExpenses = async (req, res) => {
    const currentMonth = await RentMonth.findOne({ month: getCurrentMonth() }).populate('rentItems');
    const rentMonths = await RentMonth.find({}).populate('rentItems');
    res.render('living-expenses/index', { currentMonth, rentMonths, page_name: 'Living Expenses' });
}

module.exports.createLivingExpense = async (req, res) => {
    const rentItem = new RentItem(req.body.rentItem);
    const rentMonth = await RentMonth.findOne({ month: getCurrentMonth() });
    rentMonth.rentTotal += rentItem.cost
    rentMonth.rentItems.push(rentItem);
    await rentMonth.save();
    rentItem.date = new Date();
    await rentItem.save();
    res.redirect('/living-expenses');
}