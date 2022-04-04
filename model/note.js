const mongoose = require("mongoose");

const noteSchema = mongoose.Schema({
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
  note: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("Note", noteSchema);
