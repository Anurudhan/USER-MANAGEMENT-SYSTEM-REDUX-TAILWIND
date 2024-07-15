const mongoose = require('mongoose');
require('dotenv').config();

const url = process.env.MONGO_URL;

const connectDB = mongoose.connect(url)
    .then(() => {
        console.log('connected mongo DB');
    })
    .catch((err) =>{
        console.log('error occuring connecting to mongoDB',err);
    });

module.exports = connectDB