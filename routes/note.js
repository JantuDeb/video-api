const express = require("express");
const { addNote, deleteNote, getNote } = require("../controller/note");
const isAuthenticated = require("../middleware/isAuthenticated");
const router = express.Router()
router.route("/video/note/:videoId").get(isAuthenticated, getNote);
router
  .route("/video/note/:videoId")
  .post(isAuthenticated, addNote)
  .delete(isAuthenticated, deleteNote);

module.exports = router
