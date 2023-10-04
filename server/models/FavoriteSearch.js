const { Schema, model } = require("mongoose");

const favoriteSearchSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  professionalHeadline: {
    type: String,
    required: true,
  },
});

module.exports = model("FavoriteSearch", favoriteSearchSchema);
