const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is require"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is require"],
      trim: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category Id is rerquired add a product"],
    },
    channelId: {
      type: String,
      default: "",
    },

    videoURL: {
      id: {
        type: String,
        default: "",
      },
      url: {
        type: String,
        required: [true, "Video URL is required"],
        default: "",
      },
    },
    thumbnails: {
      id: {
        type: String,
        // required: [true, "At least one thumbnail is required"],
      },
      url: {
        type: String,
        required: [true, "At least one thumbnails is required"],
      },
    },

    tags: [
      {
        type: String,
        default: "",
      },
    ],

    channelTitle: {
      type: String,
      default: "",
    },

    duration: {
      type: String,
      required: [true, "Video duration is required"],
    },

    statistics: {
      viewCount: {
        type: Number,
        default: 0,
      },
      likeCount: {
        type: Number,
        default: 0,
      },
      favoriteCount: {
        type: Number,
        default: 0,
      },
      commentCount: {
        type: Number,
        default: 0,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Video", videoSchema);
