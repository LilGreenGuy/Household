const RentItem = require('../models/RentItem');
const RentMonth = require('../models/RentMonth');
const { getCurrentMonth, getCurrentYear } = require('../utils/getCurrentDate');

module.exports.renderLivingExpenses = async (req, res) => {
    const month = new Date().getMonth();
    const year = new Date().getFullYear();
    const rentItems = await RentItem.find({
        date: {
            $gte: new Date(year, month, 1),
            $lt: new Date(year, month, 31)
        }
    });
    const rentMonths = await RentMonth.find({}).populate('rentItems');
    res.render('living-expenses/index', { rentItems, rentMonths, page_name: 'Living Expenses' });
}

module.exports.createLivingExpense = async (req, res) => {
    const cost = new RentItem(req.body.rentItem);
    const rentMonth = await RentMonth.findOne({ month: getCurrentMonth() });
    if (!rentMonth) {
        const newMonth = new RentMonth({
            year: getCurrentYear(),
            month: getCurrentMonth(),
            rentItems: []
        })
        newMonth.rentItems.push(cost);
        await newMonth.save();
    } else {
        rentMonth.rentItems.push(cost);
        await rentMonth.save();
    }
    cost.date = new Date();
    await cost.save();
    res.redirect('/living-expenses');
}