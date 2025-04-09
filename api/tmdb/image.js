export default async function handler(req, res) {
  const { file_path, size = "w500" } = req.query;

  const imageUrl = `https://image.tmdb.org/t/p/${size}${file_path}`;

  try {
    const tmdbRes = await fetch(imageUrl);
    const buffer = await tmdbRes.arrayBuffer();

    res.setHeader("Content-Type", tmdbRes.headers.get("Content-Type"));
    res.send(Buffer.from(buffer));
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch image", details: error.message });
  }
}
