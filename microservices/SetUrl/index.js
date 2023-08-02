const amqp = require('amqplib');
const express = require('express');
const connectDB = require('./config/database');
const Pair = require('./models/Pair');
require('dotenv').config;
const cors = require('cors');
const app = express();
const counter = require('./models/Counter');
app.use(express.json());
app.use(cors());
let connection, channel;
// set Long url to short url and generate short url
// first get the counter from persistent layer using amqp
// then proceed with the code
app.post('/l2s', async (req, res) => {
  try {
    const longUrl = req.body.url;
    console.log(req.body);
    const already = await Pair.findOne({ longUrl });
    if (already) {
      res.json({ url: already.shortUrl });
      return;
    }
    (async () => {
      try {
        connection = await amqp.connect('amqp://localhost');
        channel = await connection.createChannel();

        await channel.assertQueue('counterReq', { durable: false });
        channel.sendToQueue(
          'counterReq',
          Buffer.from(JSON.stringify('SendCounter'))
        );
        console.log(" [x] Sent '%s'", 'SendCounter');
        (async () => {
          try {
            await channel.consume(
              'counterAck',
              async (message) => {
                if (message) {
                  console.log(
                    " [x] Received '%s'",
                    JSON.parse(message.content.toString())
                  );
                  let n = Number(message.content.toString());
                  console.log(n);
                  map =
                    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
                  let shortUrl = '';
                  while (n > 0) {
                    shortUrl += map[n % 62];
                    n = Math.floor(n / 62);
                  }
                  const newData = await Pair.create({
                    longUrl,
                    shortUrl,
                  });
                  // await redis.set(shortUrl, longUrl);
                  await connection.close();
                  res.json({ url: newData.shortUrl });
                }
              },
              { noAck: true }
            );

            console.log(' [*] Waiting for messages. To exit press CTRL+C');
          } catch (err) {
            console.warn(err);
          }
        })();
      } catch (err) {
        console.warn(err);
      }
    })();

    // res.json({ success: true });
  } catch (error) {
    console.error(error);
  }
});

app.listen(5000, async () => {
  console.log(`SetUrl started on port ${5000}`);
  await connectDB();
});
app.listen(5001, async () => {
  console.log(`SetUrl started on port ${5001}`);
  await connectDB();
});
