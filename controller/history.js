const History = require("../model/history");

exports.addToHistory = async (req, res) => {
  const { videoId } = req.body;
  if (!videoId)
    return res
      .status(400)
      .send({ success: false, error: "Provide a video ID" });

  try {
    const history = await History.exists({ video: videoId, user: req.userId });
    if (history)
      return res
        .status(400)
        .send({ success: false, error: "This video is already in history" });

    let newHistory = await History.create({ video: videoId, user: req.userId });
    newHistory = await newHistory.populate("video");
    if (!newHistory)
      return res
        .status(404)
        .send({ success: false, error: "Something went wrong" });

    res.status(201).send({ success: true, history: newHistory });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

exports.removeFromHistory = async (req, res) => {
  const { videoId } = req.params;
  if (!videoId)
    return res
      .status(400)
      .send({ success: false, error: "Provide a video ID" });

  try {
    const history = await History.findOneAndDelete({
      video: videoId,
      user: req.userId,
    });
    if (!history)
      return res
        .status(404)
        .send({ success: false, error: "This video not in history" });

    res.status(200).send({ success: true, history });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

exports.getHistoryByUser = async (req, res) => {
  try {
    const histories = await History.find({ user: req.userId }).populate(
      "video"
    );
    if (!histories || histories.length === 0)
      return res
        .status(404)
        .send({ success: false, error: "No video found in your history list" });

    res.status(200).send({ success: true, histories });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

exports.removeAllHistory = async (req, res) => {
  try {
    const result = await History.deleteMany({
      user: req.userId,
    });
    if (result.deletedCount === 0)
      return res.status(400).send({ success: false, message: "no history found" });
    res.status(200).send({ success: true, result });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};
