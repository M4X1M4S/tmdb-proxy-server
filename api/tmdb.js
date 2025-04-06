require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const https = require("https");
const app = express();
app.use(cors({ origin: "*" })); // Allow all origins

const TMDB_API_KEY = process.env.TMDB_API_KEY;

app.get("/api/tmdb", async (req, res) => {
  try {
    const { path, ...queryParams } = req.query;

    if (!path) {
      return res.status(400).json({ error: "Path is required" });
    }

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${TMDB_API_KEY}`,
      },
      params: queryParams,
    };

    console.log(`Fetching: https://api.themoviedb.org/3/${path}`);

    const response = await axios.get(
      `https://api.themoviedb.org/3/${path}`,
      options
    );
    res.json(response.data);
  } catch (error) {
    res
      .status(error.response?.status || 500)
      .json({ error: "Failed to fetch data", details: error.message });
  }
});
const https = require("https");

app.get("/api/tmdb/image", (req, res) => {
  const { file_path, size = "w500" } = req.query;

  if (!file_path) {
    return res.status(400).json({ error: "file_path is required" });
  }

  const safePath = file_path.startsWith("/") ? file_path : `/${file_path}`;
  const imageUrl = `https://image.tmdb.org/t/p/${size}${safePath}`;

  https
    .get(imageUrl, (imageRes) => {
      if (imageRes.statusCode !== 200) {
        return res
          .status(imageRes.statusCode)
          .json({ error: "Image not found", status: imageRes.statusCode });
      }

      res.setHeader(
        "Content-Type",
        imageRes.headers["content-type"] || "image/jpeg"
      );
      res.setHeader("Cache-Control", "public, max-age=86400");

      imageRes.pipe(res);
    })
    .on("error", (err) => {
      console.error("Image fetch failed:", err);
      res
        .status(500)
        .json({ error: "Failed to proxy image", details: err.message });
    });
});

// Export Express app for Vercel
module.exports = app;
