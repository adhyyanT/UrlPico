const mongoose = require('mongoose');

const counterSchema = mongoose.Schema({
  counter: Number,
  id: {
    type: Number,
    default: 100,
  },
});
module.exports = mongoose.model('counter', counterSchema);
