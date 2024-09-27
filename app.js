if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const path = require('path');
const ejsMate = require('ejs-mate');
const MongoStore = require('connect-mongo');
const ExpressError = require('./utils/ExpressError');

const livingExpensesRoutes = require('./routes/living-expenses');

const mongoose = require('mongoose');
const dbUrl = process.env.DB_URL;
mongoose.connect(dbUrl);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
})

const app = express();

app.engine('ejs', ejsMate);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const secret = process.env.SECRET || 'thisshouldbeabettersecret!'

const store = MongoStore.create({
    mongoUrl: dbUrl,
    touchAfter: 24 * 60 * 60,
    crypto: {
        secret
    }
});

store.on("error", function (e) {
    console.log("Store error!", e);
})

// ROUTES

app.get('/', (req, res) => {
    res.render('home', {page_name: 'Home'});
})

app.get('/about', (req, res) => {
    res.render('about', {page_name: 'About'});
})

app.use('/living-expenses', livingExpensesRoutes);

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