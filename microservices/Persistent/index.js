const express = require('express');
const connectDB = require('./config/database');
const amqp = require('amqplib');
const counter = require('./models/Counter');
require('dotenv').config();
const app = express();
app.use(express.json());

(async () => {
  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    process.once('SIGINT', async () => {
      await channel.close();
      await connection.close();
    });

    await channel.assertQueue('counterReq', { durable: false });
    await channel.consume(
      'counterReq',
      async (message) => {
        if (message) {
          console.log(
            " [x] Received '%s'",
            JSON.parse(message.content.toString())
          );
          const curr = await counter.findOne({ id: 100 });
          await counter.findOneAndUpdate(
            { id: 100 },
            {
              counter: curr.counter + 1,
              id: curr.counter.id,
            }
          );
          (async () => {
            let connection;
            try {
              connection = await amqp.connect('amqp://localhost');
              const channel = await connection.createChannel();

              await channel.assertQueue('counterAck', { durable: false });
              channel.sendToQueue(
                'counterAck',
                Buffer.from(JSON.stringify(curr.counter))
              );
              console.log(" [x] Sent '%s'", curr.counter);
              await channel.close();
            } catch (err) {
              console.warn(err);
            }
          })();
        }
      },
      { noAck: true }
    );

    console.log(' [*] Waiting for messages. To exit press CTRL+C');
  } catch (err) {
    console.warn(err);
  }
})();

app.listen(5002, async () => {
  console.log(`presitent layer started on port ${5002}`);
  await connectDB();
});
