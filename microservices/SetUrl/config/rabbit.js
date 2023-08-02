var channel;
(async () => {
  let connection;
  try {
    connection = await amqp.connect('amqp://localhost');
    channel = await connection.createChannel();
    await channel.assertQueue(queue, { durable: false });
    return channel;
  } catch (err) {
    console.warn(err);
  }
})();
module.exports = channel;
