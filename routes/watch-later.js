const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middleware/isAuthenticated");
const {
  addToWatchLater,
  removeWatchLater,
  getWatchLaterVideosByUser,
} = require("../controller/watch-later");

router
  .route("/user/watch-later")
  .get(isAuthenticated, getWatchLaterVideosByUser)
  .post(isAuthenticated, addToWatchLater)

router
  .route("/user/watch-later/:videoId")
  .delete(isAuthenticated, removeWatchLater);


module.exports = router;