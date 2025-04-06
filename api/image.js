const https = require("https");

module.exports = (req, res) => {
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
};
