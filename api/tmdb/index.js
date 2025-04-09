export default async function handler(req, res) {
  const { path = "", ...query } = req.query;

  const url = new URL(`https://api.themoviedb.org/3/${path}`);
  Object.entries(query).forEach(([key, value]) =>
    url.searchParams.append(key, value)
  );

  try {
    const tmdbRes = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_BEARER_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    const data = await tmdbRes.json();

    res.status(tmdbRes.status).json(data);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch from TMDB", details: error.message });
  }
}
