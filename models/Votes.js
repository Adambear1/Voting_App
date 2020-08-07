const mongoose = require("mongoose");
const VotesSchema = mongoose.Schema({
  vote: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("votes", VotesSchema);
