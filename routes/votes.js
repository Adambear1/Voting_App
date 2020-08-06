const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const Vote = require("../models/Votes");

// Get Users Vote
router.get("/user", async ({ body }, res) => {
  try {
    const data = await Vote.findById({ userID: body._id });
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});
// Get Users Vote
router.get("/candidates", async ({ body }, res) => {
  try {
    const data = await Vote.findById({ userID: body._id });
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});
//
router.post(
  "/",
  [
    check("name", "Name is Required").not().isEmpty(),
    check("divisionID", "DivisionID is Required").not().isEmpty(),
    check("userID", "UserID is Required").not().isEmpty(),
  ],
  async ({ body }, res) => {
    try {
      const user = await Vote.find({
        _id: body.userID,
        position: body.position,
      });
      console.log(user);
      await Vote.create({
        official: body.official,
        position: body.position,
        userID: body.userID,
      })
        .then((data) => res.json(data))
        .catch((err) => res.status(404).json({ msg: err }));
    } catch (err) {
      res.status(404).json({ msg: err });
    }
  }
);

module.exports = router;
