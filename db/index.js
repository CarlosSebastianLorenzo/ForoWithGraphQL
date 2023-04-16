const mongoose = require('mongoose')
const {url} = require('./urlDataBase')

const connectDB = async () => {
    await mongoose.connect(url)
    console.log('MongoDB connected')
};

module.exports = {connectDB};