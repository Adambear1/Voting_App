require("dotenv").config();
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const config = require("config");
const Cryptr = require("cryptr");
const cryptr = new Cryptr(process.env.CRYPTR);
const { check, validationResult } = require("express-validator");

router.post(
  "/",
  [
    check("email", "Please check that email is valid").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async ({ body }, res) => {
    const { email, password } = body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: "User Not Found." });
      }
      const _pass = await cryptr.decrypt(user.password);
      if (_pass !== password) {
        return res.status(400).json({ msg: "Invalid Credentials." });
      }
      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json("Server Error");
    }
  }
);

module.exports = router;
