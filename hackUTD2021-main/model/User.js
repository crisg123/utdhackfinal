const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
    max: 255,
  },
  last_name: {
    type: String,
    required: true,
    max: 255,
  },
  email: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  username: {
    type: String,
    required: true,
    min: 6,
    max: 32,
  },
  password: {
    type: String,
    required: true,
    max: 1024,
    min: 6,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
