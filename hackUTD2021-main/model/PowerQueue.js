const mongoose = require("mongoose");

const powerQueueSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("PowerQueue", powerQueueSchema);
