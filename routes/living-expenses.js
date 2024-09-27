const express = require('express');
const router = express.Router();
const {validateRentItem} = require('../middleware');
const livingExpenses = require('../controllers/living-expenses');
const catchAsync = require('../utils/catchAsync');

router.route('/')
.get(catchAsync(livingExpenses.renderLivingExpenses))
.post(validateRentItem, catchAsync(livingExpenses.createLivingExpense));

module.exports = router;