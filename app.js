if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const path = require('path');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const flash = require('connect-flash');
const MongoStore = require('connect-mongo');
const ExpressError = require('./utils/ExpressError');
const methodOverride = require('method-override');
const passport = require('passport');
const LocalStrategy = require('passport-local');

const livingExpensesRoutes = require('./routes/living-expenses');
const householdRoutes = require('./routes/household');
const userRoutes = require('./routes/user');

const User = require('./models/user');

// MONGOOSE

const mongoose = require('mongoose');
const dbUrl = process.env.DB_URL;

mongoose.connect(dbUrl, {
    dbName: 'Household'
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
})

// APP

const app = express();

app.engine('ejs', ejsMate);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());

//SESSION CONFIGS

const secret = process.env.SECRET || 'thisshouldbeabettersecret!'

const store = MongoStore.create({
    mongoUrl: dbUrl,
    dbName: 'Household',
    touchAfter: 24 * 60 * 60,
    crypto: {
        secret
    }
});

store.on("error", function (e) {
    console.log("Store error!", e);
})

const sessionConfig = {
    store,
    name: '_household',
    secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true, // Says cookies set through the session are only accessible over HTTP, not Javascript
        // secure: true, // HTTPS.  Doels NOT work in development mode.
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 604800000
    }
};

app.use(session(sessionConfig));

// PASSPORT

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// FLASH

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

// ROUTES

app.use('/', userRoutes);
app.use('/household', householdRoutes);
app.use('/living-expenses', livingExpensesRoutes);

app.get('/', (req, res) => {
    res.render('home', { page_name: 'Home' });
})

// Error handling

app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404));
});

app.use((err, req, res, next) => {
    const { statusCode = 500, message = 'Something went wrong' } = err
    if (!err.message) err.message = 'Something went wrong';
    res.status(statusCode).render('error', { err, page_name: 'Error' });
});

// Port

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`Now serving on port ${port}`);
});