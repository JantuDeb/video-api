const mongoose = require("mongoose");

const watchLaterSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User id is require for adding watch later"],
  },
  video: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Video",
    required: [true, "Video id is required for adding watch later"],
  },
});

module.exports = mongoose.model("Watch", watchLaterSchema);
