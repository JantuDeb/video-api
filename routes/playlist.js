const express = require("express");
const {
  addToPlaylist,
  getPlaylistByUserId,
  createPlaylist,
  deleteVideoFromPlaylist,
  updatePlaylist,
  deletePlaylist,
} = require("../controller/playlist");
const router = express.Router();
const isAuthenticated = require("../middleware/isAuthenticated");

router
  .route("/user/playlists")
  .post(isAuthenticated, createPlaylist)
  .get(isAuthenticated, getPlaylistByUserId)
  .put(isAuthenticated, addToPlaylist);

router
  .route("/user/playlist/:playlistId")
  .patch(isAuthenticated, updatePlaylist)
  .delete(isAuthenticated, deletePlaylist);
router
  .route("/user/playlist/:playlistId/:videoId")
  .delete(isAuthenticated, deleteVideoFromPlaylist);

module.exports = router;
