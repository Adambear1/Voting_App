require("dotenv").config();
const Cryptr = require("cryptr");
const cryptr = new Cryptr(process.env.CRYPTR);

module.exports.hashVote = async function (x, y) {
  for (const [key, value] of Object.entries(x)) {
    y.push(`${cryptr.encrypt(value)}###${cryptr.encrypt(key)}`);
  }
};
