const User = require('../models/user');
const Household = require('../models/Household')

module.exports.renderRegister = (req, res, next) => {
    res.render('user/register', { page_name: 'Register' });
}

module.exports.createUser = async (req, res, next) => {
    try {
        const { email, username, password, verifiedPassword, street, street2, city, state, zipcode } = req.body;
        if (password !== verifiedPassword) {
            req.flash('error', 'Passwords do not match!')
            return res.redirect('/register');
        }
        const user = new User({ email, username })
        const registeredUser = await User.register(user, password);
        // const household = new Household()
        // household.users.push(user)
        // household.address = { street, street2, city, state, zipcode };
        // household.save();
        req.login(registeredUser, err => {
            if (err) return next(err)
            req.flash('success', 'Welcome to Household!');
            res.redirect('/household/new');
        });
    } catch (e) {
        req.flash('error', e.message)
        return res.redirect('/register');
    }
}

module.exports.renderLogin = (req, res) => {
    res.render('user/login', { page_name: 'Login' });
}

module.exports.login = async (req, res) => {
    req.flash('success', `Welcome back, ${req.user.username}!`);
    const redirectUrl = res.locals.returnTo || '/';
    res.redirect(redirectUrl);
}

module.exports.logout = (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Goodbye!');
        res.redirect('/');
    });
}