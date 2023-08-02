const mongoose = require('mongoose');
const pairSchema = mongoose.Schema({
  longUrl: {
    type: String,
  },
  shortUrl: {
    type: String,
  },
});
module.exports = mongoose.model('L2S', pairSchema);
