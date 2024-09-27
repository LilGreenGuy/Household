if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}


const mongoose = require('mongoose');
const RentItem = require('./models/RentItem');
const RentMonth = require('./models/RentMonth');

const dbUrl = process.env.DB_URL;
mongoose.connect(dbUrl);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected")
})


const seedDB = async () => {
    const rentItem = await RentItem.find({date: /2024, 8/})
    // const rentItem = new RentItem({
    //     reason: "Apartment Rent",
    //     cost: 1020,
    //     desc: "Rent charged in August for half of July",
    //     date: new Date(2024, 7, 1)
    // })
    // const rentItem = new RentItem({
    //     reason: "Power Bill",
    //     cost: 66,
    //     desc: "Powerbill for July charged in August",
    //     date: new Date(2024, 7, 1)
    // })
    // await rentItem.save()
    // const rentMonth = await new RentMonth({
    //     year: 2024,
    //     month: 'August',
    //     rentItems: []
    // })
    // for(let rent of rentItem) {
    //     rentMonth.rentItems.push(rent._id);
    // }
    // await rentMonth.save();
}


seedDB().then(() => {
    mongoose.connection.close()
})