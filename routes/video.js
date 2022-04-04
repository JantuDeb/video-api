const express = require("express");
const { addVideo, getVideos, getVideo, updateViewCount} = require("../controller/video");

const isAuthenticated = require("../middleware/isAuthenticated");
const router = express.Router();

router.route("/videos").post(isAuthenticated, addVideo).get(getVideos);
router.route("/video/:videoId").get(getVideo).patch(isAuthenticated,updateViewCount);
module.exports = router;
