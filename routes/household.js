const express = require('express');
const router = express.Router();
const { isLoggedIn, checkCurrentYear, checkCurrentMonth } = require('../middleware');
const household = require('../controllers/household');
const catchAsync = require('../utils/catchAsync');

router.route('/')
    .get(isLoggedIn, catchAsync(household.index))
    .post(isLoggedIn, catchAsync(household.createHousehold));

router.route('/new')
    .get(isLoggedIn, household.renderNewForm)

router.route('/:id')
    .get(isLoggedIn, checkCurrentYear, checkCurrentMonth, catchAsync(household.showHousehold))

module.exports = router;