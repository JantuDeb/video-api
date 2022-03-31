const mongoose = require("mongoose");

const likeSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User id is require for adding like"],
  },
  video: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Video",
    required: [true, "Video id is required for adding like"],
  },
});

module.exports = mongoose.model("Cart", likeSchema);
