const mongoose = require("mongoose");
const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  DOB: {
    type: String,
    required: true,
  },
  politicalAffiliation: {
    type: String,
    required: true,
  },
  sex: {
    type: String,
    required: true,
  },
  race: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.methods.createAddress = function (x, y, z, a) {
  this.address = `${x} ${y}, ${z} ${a}`;
  return this.address;
};

module.exports = mongoose.model("user", UserSchema);
