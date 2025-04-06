require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const https = require("https");
const app = express();
app.use(cors({ origin: "*" })); // Allow all origins
import https from "https";
app.get("/api/image", (req, res) => {
  const { file_path, size = "w500" } = req.query;

  if (!file_path) {
    return res.status(400).json({ error: "file_path is required" });
  }

  const safePath = file_path.startsWith("/") ? file_path : `/${file_path}`;
  const imageUrl = `https://image.tmdb.org/t/p/${size}${safePath}`;

  https
    .get(imageUrl, (imageRes) => {
      res.setHeader("Content-Type", imageRes.headers["content-type"]);
      imageRes.pipe(res);
    })
    .on("error", (err) => {
      res.status(500).json({
        error: "Failed to proxy image",
        details: err.message,
      });
    });
});
module.exports = app;
