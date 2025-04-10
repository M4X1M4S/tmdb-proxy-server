const axios = require("axios");

module.exports = async (req, res) => {
  try {
    const { file_path, size = "original" } = req.query;

    if (!file_path) {
      return res.status(400).json({ error: "file_path is required" });
    }

    const imageUrl = `https://image.tmdb.org/t/p/${size}${file_path}`;
    const response = await axios.get(imageUrl, { responseType: "arraybuffer" });

    res.setHeader("Content-Type", response.headers["content-type"]);
    res.send(Buffer.from(response.data, "binary"));
  } catch (error) {
    res
      .status(error.response?.status || 500)
      .json({ error: "Failed to fetch image", details: error.message });
  }
};
