const mongoose = require('mongoose');
require('dotenv').config();
let client;
const connectDB = async () => {
  try {
    const data = await mongoose.connect(process.env.URI);
    console.log(`MongoDB connected ${data.connection.host}`);
  } catch (error) {
    console.log('failed to connect mongoDB');
    console.error(error);
  }
};

module.exports = connectDB;
