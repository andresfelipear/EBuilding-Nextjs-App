require('dotenv').config()
const mongoose = require('mongoose')
const { log } = require('mercedlogger')

const { NEXT_PUBLIC_MONGODB_URL } = process.env
mongoose.connect(NEXT_PUBLIC_MONGODB_URL)
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

module.exports = mongoose