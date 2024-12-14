const Household = require('../models/Household');
const RentYear = require('../models/RentYear');
const User = require('../models/user')

module.exports.index = async (req, res) => {
    const user = req.user;
    const household = await Household.findOne({ users: user._id });

    res.redirect(`/household/${household._id}`);
}

module.exports.renderNewForm = (req, res) => {
    const user = req.user;

    res.render('household/new', { page_name: "New Household", user });
}

module.exports.createHousehold = async (req, res) => {
    const user = await User.findOne(req.user);
    const household = new Household({ name: req.body.household.name });
    household.address = req.body.address;
    household.users.push(user._id);
    household.save();

    res.redirect('/');
}

module.exports.showHousehold = async (req, res) => {
    const { id } = req.params;
    const household = await Household.findById(id).populate({path: 'users'});
    const rentYears = await RentYear.find({ household });
    const numMonths = rentYears[0].rentMonths.length;
    const householdSalary = household.users.reduce((totalSalary, user) => totalSalary + user.salary, 0);
    const salary = [];
    for (let i = 0; i < numMonths; i++) salary.push(householdSalary/12);

    res.render(`household/show`, { household, salary, rentYears, page_name: "Household" });
}