const axios = require("axios");

module.exports = async (req, res) => {
  const { path, ...queryParams } = req.query;
  const TMDB_API_KEY = process.env.TMDB_API_KEY;

  if (!path) {
    return res.status(400).json({ error: "Path is required" });
  }

  try {
    const response = await axios.get(`https://api.themoviedb.org/3/${path}`, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${TMDB_API_KEY}`,
      },
      params: queryParams,
    });

    res.status(200).json(response.data);
  } catch (err) {
    res
      .status(err.response?.status || 500)
      .json({ error: "Failed to fetch data", details: err.message });
  }
};
