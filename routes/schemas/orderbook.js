const mongoose = require('mongoose');

const { Schema } = mongoose;
const marketSchema = new Schema({
  market: {
    type: String,
    required: true,
    // unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  totalAskSize: {
    type: Number,
    required: true
  },
  totalBidSize: {
      type: Number,
      required: true
  },
});

module.exports = mongoose.model('orderbook', marketSchema);
