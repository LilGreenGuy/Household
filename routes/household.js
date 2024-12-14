const express = require('express');
const router = express.Router();
const { isLoggedIn, checkCurrentYear, checkCurrentMonth, checkHousehold, isHouseholdUser } = require('../middleware');
const household = require('../controllers/household');
const catchAsync = require('../utils/catchAsync');

router.route('/')
    .get(isLoggedIn, checkHousehold, catchAsync(household.index))
    .post(isLoggedIn, checkHousehold, catchAsync(household.createHousehold));

router.route('/new')
    .get(isLoggedIn, household.renderNewForm)

router.route('/:id')
    .get(isLoggedIn, checkCurrentYear, checkCurrentMonth, isHouseholdUser, catchAsync(household.showHousehold))

module.exports = router;