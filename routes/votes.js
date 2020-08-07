require("dotenv").config();
const express = require("express");
const User = require("../models/User");
const Votes = require("../models/Votes");
const router = express.Router();
const Cryptr = require("cryptr");
const cryptr = new Cryptr(process.env.CRYPTR);
const { check } = require("express-validator/check");
const { hashVote } = require("../utils/votes");

// Get Users Vote
router.get("/user", async ({ body }, res) => {
  try {
    const data = await Votes.findById({ userID: body._id });
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});
// Get Users Vote
router.get("/candidates", async ({ body }, res) => {
  try {
    const data = await Votes.findById({ userID: body._id });
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});
//Make Vote
router.post(
  "/",
  [
    check("_id", "User Not Found").not().isEmpty(),
    check("official", "Candidate Name Not Found").not().isEmpty(),
    check("divisionID", "Division Name Not Found").not().isEmpty(),
  ],
  async ({ body }, res) => {
    Votes.find({}, (err, data) => {
      if (err) throw err;
      // for (let i = 0; i < data.length; i++) {
      //   console.log(data[1]["vote"]);
      //   i++;
      // }
      data.filter((item) => {
        console.log(item["vote"].length);
        let candidate = item["vote"].substr(0, 216);
        let position = item["vote"].substr(219, 435);
        let user = item["vote"].substr(438, item["vote"].length - 1);

        console.log(cryptr.decrypt(candidate));
        console.log(cryptr.decrypt(position));
        console.log(cryptr.decrypt(user));
      });
    });
    var str = [];
    await hashVote(body, str);
    Votes.create({ vote: str.toString() }, (err, data) => {
      if (err) {
        res.status(400).json({ msg: err });
      } else {
        res.json(data);
      }
    });
  }
);

module.exports = router;
