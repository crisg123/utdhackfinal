const express = require("express");
const router = express.Router();
const verify = require("./verifyToken");
const User = require("../model/User");
const Sendmail = require("../model/Sendmail");
const { sendMailValidation } = require("../validation");
//const sgMail = require("@sendgrid/mail");
//sgMail.setApiKey(process.env.SENDGRID_API_KEY);

/*
    SendMail
*/
router.post("/mail", verify, async (req, res) => {
    // Validate email first with Joi
    const { error } = sendMailValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Check if Email exists in Users database
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Email not found!");

    /*// set sendgrid mail stuff
    const msg = {
      to: req.body.email,
      from: "jhooperwork@gmail.com",
      subject: "charityQ",
      text: req.body.msg,
    };*/
    // Create new message
    const mail = new Sendmail({
        email: req.body.email,
        msg: req.body.msg,
    });
    try {
        //const sgM = await sgMail.send(msg);
        const savedMail = await mail.save();
        res.send(savedMail);
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;
