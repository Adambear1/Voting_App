const mongoose = require("mongoose");
const VotesSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  candidate: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  political_affiliation: {
    type: String,
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("votes", VotesSchema);
