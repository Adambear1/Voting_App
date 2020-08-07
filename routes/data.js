require("dotenv").config();
const express = require("express");
const User = require("../models/User");
const Votes = require("../models/Votes");
const router = express.Router();
const axios = require("axios");
const Cryptr = require("cryptr");
const cryptr = new Cryptr(process.env.CRYPTR);
const { check, validationResult } = require("express-validator/check");

router.get("/officials", async ({ body }, res) => {
  try {
    if (!body.street || !body.city || !body.state || !body.zipCode) {
      res.status(300).json({
        msg: "Invalid Address. Please Make Sure Fields are Inserted Correctly",
      });
    }
    const data = await axios.get(
      `https://www.googleapis.com/civicinfo/v2/representatives?key=${process.env.APIKEY}`,
      {
        params: {
          address: `${body.street}, ${body.city} ${body.state} ${body.zipCode}`,
        },
      }
    );
    res.json(data.data.officials);
  } catch (err) {
    console.log(err);
  }
});

router.get("/offices", async ({ body }, res) => {
  if (!body.street || !body.city || !body.state || !body.zipCode) {
    res.status(300).json({
      msg: "Invalid Address. Please Make Sure Fields are Inserted Correctly",
    });
  }
  const data = await axios.get(
    `https://www.googleapis.com/civicinfo/v2/representatives?key=${process.env.APIKEY}`,
    {
      params: {
        address: `${body.street}, ${body.city} ${body.state} ${body.zipCode}`,
      },
    }
  );
  res.json(data.data.offices);
});

module.exports = router;
