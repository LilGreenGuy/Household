const User = require('../models/user');
const Household = require('../models/Household')

module.exports.renderRegister = (req, res, next) => {
    res.render('user/register', { page_name: 'Register' });
}

module.exports.createUser = async (req, res, next) => {
    try {
        const { email, username, password, verifiedPassword } = req.body;
        if (password !== verifiedPassword) {
            req.flash('error', 'Passwords do not match!');
            return res.redirect('/register');
        }
        const user = new User({ email, username })
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', 'Welcome to Household!');
            res.redirect('/household/new');
        });
    } catch (e) {
        req.flash('error', e.message);
        return res.redirect('/register');
    }
}

module.exports.renderLogin = (req, res, next) => {
    res.render('user/login', { page_name: 'Login' });
}

module.exports.login = async (req, res, next) => {
    req.flash('success', `Welcome back, ${req.user.username}!`);
    const redirectUrl = res.locals.returnTo || '/';

    res.redirect(redirectUrl);
}

module.exports.renderProfile = async (req, res, next) => {
    const user = req.user;
    const household = await Household.findOne({ users: user._id });

    res.render('user/profile', { user, household, page_name: 'Profile' });
}

module.exports.updateProfile = async (req, res, next) => {
    const user = req.user;
    const { displayname, email, salary } = req.body;
    if (!displayname && !email && !salary) {
    req.flash('error', "Please enter updated information!");
    res.redirect('/profile');
    }
    if(displayname) {
        await User.findByIdAndUpdate(user.id, {displayname});
    }
    if (email){
        await User.findByIdAndUpdate(user.id, {email});
    }
    if (salary) {
        await User.findByIdAndUpdate(user.id, {salary});
    }

    req.flash('success', `You've successfully updated your ${displayname ? "real name " : ""}${email ? "email " : ""}${salary ? "salary " : ""}information!`);
    res.redirect('/profile');
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