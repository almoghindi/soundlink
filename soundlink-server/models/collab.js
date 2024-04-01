const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const collabSchema = new Schema({
  user1Id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  user2Id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  collabAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("collab", collabSchema);
