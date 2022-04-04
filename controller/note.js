const Note = require("../model/note");
exports.addNote = async (req, res) => {
  const { videoId } = req.params;
  try {
    const noteExist = await Note.exists({
      user: req.userId,
      video: videoId,
    });

    let note;
    if (noteExist) {
      note = await Note.findOneAndUpdate(
        { user: req.userId, video: videoId },
        { note: req.body.note }
      );
    } else {
      note = await Note.create({
        note: req.body.note,
        user: req.userId,
        video: videoId,
      });
    }

    if (!note)
      return res
        .status(404)
        .send({ success: false, message: "Video Id is requiired" });

    // return  a video
    res.status(200).send({ success: true, note });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};
exports.getNote = async (req, res) => {
  const { videoId } = req.params;
  try {
    const note = await Note.findOne({
      user: req.userId,
      video: videoId,
    });
    if (!note)
      return res.status(404).send({ success: false, message: "No note found" });

    // return  a video
    res.status(200).send({ success: true, note });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

exports.deleteNote = async (req, res) => {
  const { videoId } = req.params;
  try {
    const note = await Note.findOneAndDelete({
      user: req.userId,
      video: videoId,
    });
    if (!note)
      return res
        .status(404)
        .send({ success: false, message: "No note found with this video id" });

    // return  a video
    res.status(200).send({ success: true, note });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};
