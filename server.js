require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;
const TMDB_API_KEY = process.env.TMDB_API_KEY;

app.use(cors());

app.get("/api/tmdb", async (req, res) => {
  try {
    const { path, ...queryParams } = req.query;

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${TMDB_API_KEY}`,
      },
      params: queryParams,
    };

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

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
