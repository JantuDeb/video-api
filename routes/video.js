const express = require("express");
const { addVideo, getVideos } = require("../controller/video");

const isAuthenticated = require("../middleware/isAuthenticated");
const router = express.Router();

router.route("/videos").post(isAuthenticated, addVideo).get(getVideos);

module.exports = router;
