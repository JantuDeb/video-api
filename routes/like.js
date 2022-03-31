const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middleware/isAuthenticated");
const {
  addLike,
  removeLike,
  getLikeVideosByUser,
  removeAllLikeVideos
} = require("../controller/like");

router
  .route("/user/likes")
  .get(isAuthenticated, getLikeVideosByUser)
  .post(isAuthenticated, addLike)
  .delete(isAuthenticated, removeAllLikeVideos)

router
  .route("/user/like/:videoId")
  .delete(isAuthenticated, removeLike);


module.exports = router;
