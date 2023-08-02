const express = require('express');
const connectDB = require('./config/database');
const Pair = require('./models/Pair');
const cors = require('cors');
require('dotenv').config;
const app = express();
app.use(express.json());
app.use(cors());

// const cache = async (req, res, next) => {
//   const shortUrl = req.originalUrl.split('/')[2];
//   const result = await redis.get(shortUrl);
//   if (result !== null) {
//     if (result.includes('http')) {
//       res.redirect(result);
//     } else {
//       res.redirect('https://' + result);
//     }
//     // console.log('HIT');
//     // console.log('https://' + result);
//   } else next();
// };

// set Long url to short url and generate short url
app.get('/s2l/[a-z0-9A-Z]', async (req, res) => {
  try {
    const shortUrl = req.originalUrl.split('/')[2];
    const longUrl = await Pair.findOne({ shortUrl });
    // await redis.set(shortUrl, longUrl);
    // console.log(longUrl.longUrl);
    // console.log(longUrl.includes('http'));
    if (longUrl.longUrl.includes('http')) {
      res.redirect(longUrl.longUrl);
    } else {
      res.redirect('https://' + longUrl.longUrl);
    }
  } catch (error) {
    res.send('No Website');
  }
});

app.listen(process.env.PORT, async () => {
  console.log(`SetUrl started on port ${process.env.PORT}`);
  redis = await connectDB();
});
