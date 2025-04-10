require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors({ origin: "*" }));

const TMDB_API_KEY = process.env.TMDB_API_KEY;

app.get("/api/tmdb", async (req, res) => {
  try {
    const { path, ...queryParams } = req.query;

    if (!path) {
      return res.status(400).json({ error: "Path is required" });
    }

    const response = await axios.get(`https://api.themoviedb.org/3/${path}`, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${TMDB_API_KEY}`,
      },
      params: queryParams,
    });

    res.json(response.data);
  } catch (error) {
    res
      .status(error.response?.status || 500)
      .json({ error: "Failed to fetch data", details: error.message });
  }
});

module.exports = app;
