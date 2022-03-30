const Playlist = require("../model/playlist");
exports.createPlaylist = async (req, res) => {
  const { name, description } = req.body;
  if (!name)
    return res.status(400).send({ success: false, error: "Name is required" });
  try {
    const playlist = await Playlist.create({
      name,
      description,
      user: req.userId,
    });
    res.status(201).send({ success: true, playlist });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

exports.getPlaylistByUserId = async (req, res) => {
  try {
    const playlists = await Playlist.find({ user: req.userId }).populate(
      "videos"
    );
    if (!playlists || playlists.length === 0)
      return res
        .status(404)
        .send({ success: false, error: "No videos found in your playlist" });

    res.status(200).send({ success: true, playlists });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

exports.deleteVideoFromPlaylist = async (req, res) => {
  const { playlistId, videoId } = req.params;
  try {
    const playlist = await Playlist.findByIdAndUpdate(
      {
        _id: playlistId,
      },
      {
        $pull: {
          videos: videoId,
        },
      },
      { new: true }
    );
    if (!playlist)
      return res
        .status(400)
        .send({ success: false, message: "Video not found in playlist" });
    res.status(200).send({ success: true, playlist });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

exports.addToPlaylist = async (req, res) => {
  const { videoId, playlistId } = req.body;
  if (!videoId || !playlistId)
    return res
      .status(400)
      .send({ success: false, error: "Video Id is requred" });

  try {
    const playlist = await Playlist.findOneAndUpdate(
      { user: req.userId, _id: playlistId, videos: { $ne: videoId } },
      {
        $push: {
          videos: videoId,
        },
      },
      { new: true }
    ).populate("videos");
    if (!playlist)
      return res
        .status(400)
        .send({ success: false, error: "Video already added to playlist" });
    res.status(200).send({ success: true, playlist });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: error.message });
  }
};

exports.updatePlaylist = async (req, res) => {
  const { name, description } = req.body;
  const { playlistId } = req.params;
  if (!name || !playlistId)
    return res
      .status(400)
      .send({ success: false, error: "Name is and playlist Id required" });
  try {
    const playlist = await Playlist.findByIdAndUpdate(
      { _id: playlistId },
      {
        name,
        description,
      },
      { new: true }
    );
    res.status(200).send({ success: true, playlist });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

exports.deletePlaylist = async (req, res) => {
  const { playlistId } = req.params;
  if (!playlistId)
    return res
      .status(400)
      .send({ success: false, error: "Playlist Id required" });
  try {
    const playlist = await Playlist.findByIdAndDelete(
      { _id: playlistId },
      { new: true }
    );
    res.status(200).send({ success: true, playlist });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: error.message });
  }
};
