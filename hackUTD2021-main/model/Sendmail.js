const mongoose = require("mongoose");

const sendMailSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        min: 6,
        max: 255,
    },
    msg: {
        type: String,
        required: true,
        min: 1,
        max: 2048,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Sendmail", sendMailSchema);
