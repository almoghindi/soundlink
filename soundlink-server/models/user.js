const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  phone: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  gender: { type: String, required: true },
  profession: { type: String, required: true },
  songs: [
    {
      name: { type: String, required: true },
      url: { type: String, required: true },
    },
    { _id: false },
  ],
  imageUrl: { type: String, required: true },
  genres: [{ type: String, required: true }],
  ILiked: [
    {
      _id: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      likedAt: { type: Date, default: Date.now() },
    },
  ],
  IDisliked: [
    {
      _id: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      dislikedAt: { type: Date, default: Date.now() },
    },
  ],
  isPremium: {
    type: Boolean,
    default: false,
  },
  collabs: [{ type: Schema.Types.ObjectId, ref: "Collab" }],
  registeredAt: { type: Date },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("User", userSchema);
