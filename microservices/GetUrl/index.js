const express = require('express');
const connectDB = require('./config/database');
const Pair = require('./Models/Pair');
require('dotenv').config;
const app = express();
app.use(express.json());
let redis;
const cache = async (req, res, next) => {
  const shortUrl = req.originalUrl.split('/')[2];
  const result = await redis.get(shortUrl);
  if (result !== null) {
    // console.log('HIT');
    // console.log('https://' + result);
    res.redirect('https://' + result);
  } else next();
};

// set Long url to short url and generate short url
app.get('/s2l/[a-z0-9A-Z]', cache, async (req, res) => {
  try {
    const shortUrl = req.originalUrl.split('/')[2];
    const longUrl = await Pair.findOne({ shortUrl });
    await redis.set(shortUrl, longUrl);
    res.redirect('https://' + longUrl.longUrl);
  } catch (error) {
    res.send('No Website');
  }
});

app.listen(process.env.PORT, async () => {
  console.log(`SetUrl started on port ${process.env.PORT}`);
  redis = await connectDB();
});
