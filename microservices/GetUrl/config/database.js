const mongoose = require('mongoose');
require('dotenv').config();
const redis = require('redis');
let client;
const connectDB = async () => {
  try {
    const data = await mongoose.connect(process.env.URI);
    console.log(`MongoDB connected ${data.connection.host}`);
  } catch (error) {
    console.log('failed to connect mongoDB');
    console.error(error);
  }
  // try {
  //   console.log('Connecting to the Redis');
  //   client = redis.createClient({
  //     password: process.env.REDIS_PASS,
  //     socket: {
  //       host: process.env.REDIS_HOST,
  //       port: process.env.REDIS_PORT,
  //     },
  //   });
  //   (async () => {
  //     await client.connect();
  //   })();
  //   client.on('ready', () => {
  //     console.log('Redis Connected!');
  //   });

  //   client.on('error', (err) => {
  //     console.log('Error in the Connection Redis');
  //   });
  //   return client;
  // } catch (error) {
  //   console.error(error);
  // }
};

module.exports = connectDB;
