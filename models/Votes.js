const mongoose = require("mongoose");
const VotesSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  votes: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
