require("dotenv").config();
const express = require("express");
const User = require("../models/User");
const Votes = require("../models/Votes");
const router = express.Router();
const axios = require("axios");
const Cryptr = require("cryptr");
const cryptr = new Cryptr(process.env.CRYPTR);

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
  try {
    User.findById(body._id, (err, data) => {
      if (!data) {
        res.status(400).json({ msg: err.message });
      } else {
        Votes.find(
          {
            userID: data._id,
            divisionID: body.divisionID,
          },
          (err, data) => {
            if (data) {
              res
                .status(400)
                .json({ msg: "User has already voted for this position" });
            } else {
              function shuffle(array) {
                var currentIndex = array.length,
                  temporaryValue,
                  randomIndex;
                while (0 !== currentIndex) {
                  randomIndex = Math.floor(Math.random() * currentIndex);
                  currentIndex -= 1;
                  temporaryValue = array[currentIndex];
                  array[currentIndex] = array[randomIndex];
                  array[randomIndex] = temporaryValue;
                }
                return array;
              }
              var str = [];
              shuffle(data);
              for (const [key, value] of Object.entries(data)) {
                let val = cryptr.encrypt(value, key[(0, 2)]);
                str.push(val);
              }

              Votes.create({ vote: str });
            }
          }
        );
      }
    });
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
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
