const express = require('express');
const router = express.Router();
const {validateRentItem, checkCurrentYear, checkCurrentMonth, checkHousehold} = require('../middleware');
const livingExpenses = require('../controllers/living-expenses');
const catchAsync = require('../utils/catchAsync');

router.route('/')
.get(checkCurrentYear, checkCurrentMonth, checkHousehold, catchAsync(livingExpenses.renderLivingExpenses))
.post(validateRentItem, catchAsync(livingExpenses.createLivingExpense));

module.exports = router;