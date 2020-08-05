require("dotenv").config();
const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/", async ({ body }, res) => {
  axios
    .get(
      `https://www.googleapis.com/civicinfo/v2/representatives?key=${process.env.APIKEY}`,
      {
        params: {
          address: `${body.street}, ${body.city} ${body.state} ${body.zipCode}`,
        },
      }
    )
    .then((data) => {
      console.log(data);
      res.status(200).json({
        success: true,
        result: data,
      });
    })
    .catch((err) => {
      res.status(404).json(err);
    });
});

module.exports = router;
