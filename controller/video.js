const cloudinary = require("cloudinary");
const Video = require("../model/video");
exports.addVideo = async (req, res) => {
  const {
    title,
    description = "",
    categoryId,
    channelId,
    tags = [],
    channelTitle,
    duration,
  } = req.body;
  if (!req.files?.thumbnails)
    return res
      .status(400)
      .send({ success: false, message: "Upload a thumbnail" });

  if (!title || !categoryId || !duration)
    return res
      .status(400)
      .send({ success: false, message: "Please provide all the fields" });

  try {
    const { public_id, secure_url } = await cloudinary.v2.uploader.upload(
      req.files.thumbnails.tempFilePath,
      { folder: "thumbnails" }
    );
    const thumbnails = { id: public_id, url: secure_url };

    const video = await Video.create({
      title,
      description,
      category: categoryId,
      thumbnails,
      tags,
      channelId,
      channelTitle,
      duration,
    });

    res.status(201).send({ success: true, video });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// get all videos  ---> /api/videos
exports.getVideos = async (req, res) => {
  try {
    // get all videos from db
    const videos = await Video.find();
    // if no videos found return 404
    if (!videos && videos.length === 0)
      return res
        .status(404)
        .send({ success: false, message: "No videos found" });

    // return all videos
    res.status(200).send({ success: true, videos });
  } catch (error) {
    // if error return 500
    res.status(500).send({ success: false, message: error.message });
  }
};
