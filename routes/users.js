require("dotenv").config();
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const config = require("config");
const Cryptr = require("cryptr");
const cryptr = new Cryptr(process.env.CRYPTR);
const { check, validationResult } = require("express-validator/check");

router.get("/", async (req, res) => {
  try {
    const user = await User.findById(req.body.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});
// @route   POST api/users
// @desc    POST Register a user
// @access  Public
router.post(
  "/",
  [
    check("name", "Please assure valid name is presented").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
    check("streetAddress", "Please enter your street address.").not().isEmpty(),
    check("city", "Please enter your city.").not().isEmpty(),
    check("state", "Please enter your state.").not().isEmpty(),
    check("zipCode", "Please enter your zip code.").not().isEmpty(),
    check("DOB", "Please enter a correct DOB.").not().isEmpty(),
    check("politicalAffiliation", "Please enter an affiliation.")
      .not()
      .isEmpty(),
    check("sex", "Please enter your gender.").not().isEmpty(),
    check("race", "Please enter your race.").not().isEmpty(),
  ],
  async ({ body }, res) => {
    await User.findOne({ email: body.email }, (err, data) => {
      if (data) {
        res.status(400).json({ msg: "User Already Exists" });
      } else {
        const user = new User(body);
        const address = user.createAddress(
          body.streetAddress,
          body.city,
          body.state,
          body.zipCode
        );
        const password = cryptr.encrypt(body.password);
        User.create(
          {
            name: body.name,
            email: body.email,
            password,
            address,
            DOB: body.DOB,
            politicalAffiliation: body.politicalAffiliation,
            sex: body.sex,
            race: body.race,
          },
          (err, data) => {
            if (err) {
              res.status(400).json({ msg: err });
            } else {
              res.json(data);
            }
          }
        );
      }
    });
  }
);
router.delete(
  "/",
  [check("email", "Please include a valid email").isEmail()],
  async ({ body }, res) => {
    await User.findOneAndDelete({ email: body.email })
      .then((data) => {
        try {
          res.json(data);
        } catch (err) {
          res.status(404).json({ msg: "User Not Found" });
        }
      })
      .catch((err) => {
        res.status(404).json({ msg: "User Not Found" });
      });
  }
);
module.exports = router;
