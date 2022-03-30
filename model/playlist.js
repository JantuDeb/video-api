const mongoose = require("mongoose");

const playlistSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User id is require for add playlist"],
    },

    name: {
      type: String,
      required: [true, "Playlist name is requred"],
    },
    description:{
      type:String,
      default:""
    },
    videos: [
      {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Video",

      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Playlist", playlistSchema);
