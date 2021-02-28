const express = require("express");
const router = express.Router();
const verify = require("./verifyToken");
const WaterQueue = require("../model/WaterQueue");
const PowerQueue = require("../model/PowerQueue");
const ToiletriesQueue = require("../model/ToiletriesQueue");
const User = require("../model/User");
const { emailValidation } = require("../validation");

/*
  Water Queue
*/
router.delete("/waterDelete", verify, async (req, res) => {
  // Validate Email first with Joi
  const { error } = emailValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Check if user is already in queue database
  const emailExist = await WaterQueue.findOne({ email: req.body.email });
  if (!emailExist) return res.status(400).send("Email not found!");

  try {
    const result = await WaterQueue.findOneAndDelete({ email: req.body.email });
    res.send({ email: req.body.email });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/waterOldest", verify, async (req, res) => {
  // get the oldest entry / top of water queue
  const oldestWQ = await WaterQueue.findOne()
    .sort({ field: "asc", _id: 1 })
    .limit(1);
  if (!oldestWQ) return res.status(400).send("No one in queue!");
  res.json({ email: oldestWQ.email });
});

router.post("/water", verify, async (req, res) => {
  // Validate Email first with Joi
  console.log(req.body)
  const { error } = emailValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Check if Email exists in Users database
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email not found!");

  // Check if user is already in queue database
  const emailExist = await WaterQueue.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email already exists");

  // Create new water queue
  const waterQ = new WaterQueue({
    email: req.body.email,
  });
  try {
    const savedWQ = await waterQ.save();
    res.send({ email: waterQ.email });
  } catch (err) {
    res.status(400).send(err);
  }
});

/*
  Power Queue
*/
router.delete("/powerDelete", verify, async (req, res) => {
  // Validate Email first with Joi
  const { error } = emailValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Check if user is already in queue database
  const emailExist = await PowerQueue.findOne({ email: req.body.email });
  if (!emailExist) return res.status(400).send("Email not found!");

  try {
    const result = await PowerQueue.findOneAndDelete({ email: req.body.email });
    res.send({ email: req.body.email });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/powerOldest", verify, async (req, res) => {
  // get the oldest entry / top of power queue
  const oldestPQ = await PowerQueue.findOne()
    .sort({ field: "asc", _id: 1 })
    .limit(1);
  if (!oldestPQ) return res.status(400).send("No one in queue!");
  res.json({ email: oldestPQ.email });
});

router.post("/power", verify, async (req, res) => {
  // Validate Email first with Joi
  const { error } = emailValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Check if Email exists in Users database
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email not found!");

  // Check if user is already in queue database
  const emailExist = await PowerQueue.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email already exists");

  // Create new power queue
  const powerQ = new PowerQueue({
    email: req.body.email,
  });
  try {
    const savedPQ = await powerQ.save();
    res.send({ email: powerQ.email });
  } catch (err) {
    res.status(400).send(err);
  }
});

/*
  Toiletries Queue
*/
router.delete("/toiletriesDelete", verify, async (req, res) => {
  // Validate Email first with Joi
  const { error } = emailValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Check if user is already in queue database
  const emailExist = await ToiletriesQueue.findOne({ email: req.body.email });
  if (!emailExist) return res.status(400).send("Email not found!");

  try {
    const result = await ToiletriesQueue.findOneAndDelete({
      email: req.body.email,
    });
    res.send({ email: req.body.email });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/toiletriesOldest", verify, async (req, res) => {
  // get the oldest entry / top of toiletries queue
  const oldestTQ = await ToiletriesQueue.findOne()
    .sort({ field: "asc", _id: 1 })
    .limit(1);
  if (!oldestTQ) return res.status(400).send("No one in queue!");
  res.json({ email: oldestTQ.email });
});

router.post("/toiletries", verify, async (req, res) => {
  // Validate Email first with Joi
  const { error } = emailValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Check if Email exists in Users database
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email not found!");

  // Check if user is already in queue database
  const emailExist = await ToiletriesQueue.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email already exists");

  // Create new toiletries queue
  const toiletriesQ = new ToiletriesQueue({
    email: req.body.email,
  });
  try {
    const savedTQ = await toiletriesQ.save();
    res.send({ email: toiletriesQ.email });
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
