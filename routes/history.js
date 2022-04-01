const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middleware/isAuthenticated");
const {
  addToHistory,
  removeFromHistory,
  removeAllHistory,
  getHistoryByUser,
} = require("../controller/history");

router
  .route("/user/history")
  .get(isAuthenticated, getHistoryByUser)
  .post(isAuthenticated, addToHistory)
  .delete(isAuthenticated, removeAllHistory);

router
  .route("/user/history/:videoId")
  .delete(isAuthenticated, removeFromHistory);

module.exports = router;
