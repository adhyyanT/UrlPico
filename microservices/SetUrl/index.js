const express = require('express');
const connectDB = require('./config/database');
const Pair = require('./Models/Pair');
require('dotenv').config;
const app = express();
const counter = require('./Models/Counter');
app.use(express.json());

let redis;
// set Long url to short url and generate short url
app.get('/l2s', async (req, res) => {
  try {
    const longUrl = req.body.url;
    const already = await Pair.findOne({ longUrl });
    if (already) {
      res.json(already.shortUrl);
      return;
    }
    const curr = await counter.findOne({ id: 100 });
    await counter.findOneAndUpdate(
      { id: 100 },
      {
        counter: curr.counter + 1,
        id: curr.counter.id,
      }
    );
    let n = curr.counter;
    map = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    let shortUrl = '';
    while (n > 0) {
      shortUrl += map[n % 62];
      n = Math.floor(n / 62);
    }
    const newData = await Pair.create({
      longUrl,
      shortUrl,
    });
    await redis.set(shortUrl, longUrl);
    res.json(newData.shortUrl);
  } catch (error) {
    console.error(error);
  }
});

app.listen(process.env.PORT, async () => {
  console.log(`SetUrl started on port ${process.env.PORT}`);
  redis = await connectDB();
});
