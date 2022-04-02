const Like = require("../model/like");
const Video = require("../model/video");
exports.addLike = async (req, res) => {
  const { videoId } = req.body;
  if (!videoId)
    return res
      .status(400)
      .send({ success: false, error: "Provide a video ID" });

  try {
    const like = await Like.exists({ video: videoId, user: req.userId });
    if (like)
      return res
        .status(400)
        .send({ success: false, error: "You already liked this video" });

    await Video.findByIdAndUpdate(
      { _id: videoId },
      {
        $inc: {
          "statistics.likeCount": 1,
        },
      }
    );
    let newLike = await Like.create({ video: videoId, user: req.userId });
    newLike = await newLike.populate("video");
    if (!newLike)
      return res
        .status(404)
        .send({ success: false, error: "Something went wrong" });

    res.status(201).send({ success: true, like: newLike });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

exports.removeLike = async (req, res) => {
  const { videoId } = req.params;
  if (!videoId)
    return res
      .status(400)
      .send({ success: false, error: "Provide a video ID" });

  try {

    await Video.findByIdAndUpdate(
      { _id: videoId },
      {
        $inc: {
          "statistics.likeCount": -1,
        },
      }
    );
    const like = await Like.findOneAndDelete({
      video: videoId,
      user: req.userId,
    });
    if (!like)
      return res
        .status(404)
        .send({ success: false, error: "This video not in like" });

    res.status(200).send({ success: true, like });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

exports.getLikeVideosByUser = async (req, res) => {
  try {
    const likes = await Like.find({ user: req.userId }).populate("video");
    if (!likes || likes.length === 0)
      return res
        .status(404)
        .send({ success: false, error: "No video found in your like list" });

    res.status(200).send({ success: true, likes });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

exports.removeAllLikeVideos = async (req, res) => {
  try {
    const likes = await Like.deleteMany({
      user: req.userId,
    });
    res.status(200).send({ success: true, likes });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};
