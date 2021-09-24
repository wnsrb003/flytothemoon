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
  tradePrice: {
    type: Number,
    required: true
  },
  lowPrice: {
      type: Number,
      required: true
  },
  highPrice: {
      type: Number,
      required: true
  },
  tradeVolume: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('candleOne', marketSchema);
