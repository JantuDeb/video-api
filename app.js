const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const app = express();
require("dotenv").config();
require("./config/database").connect();
//regular middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//cookies and file middleware
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);

const corsConFig = {
  origin:['http://localhost:3000','https://ionvu-live.netlify.app/','https://deploy-preview-5--ionvu-live.netlify.app'],
  credentials: true,
};
//cors middleware
app.use(cors(corsConFig));

// import all routes
const user = require("./routes/user");
const category = require("./routes/category");
const video = require("./routes/video");
const like = require("./routes/like");
const playlist = require("./routes/playlist");

//routes middlewares
app.use("/api/v1", user); // user routes
app.use("/api/v1", category); // category routes
app.use("/api/v1", video); // video routes
app.use("/api/v1", like); // like routes
app.use("/api/v1", playlist); // playlist routes

module.exports = app;
