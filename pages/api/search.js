export default async (req, res) => {
  if (!("access_token" in req.query)) {
    return res.redirect(400, "/error?code=no access token search parameter");
  }
  if (!("q" in req.query)) {
    return res.redirect(400, "/error?code=No query search parameter");
  }

  var response =
    req.query.q === ""
      ? await fetch(
          "https://api.spotify.com/v1/me/top/tracks?" +
            new URLSearchParams({ limit: 12, time_range: "medium_term" }),
          { headers: { Authorization: "Bearer " + req.query.access_token } }
        )
      : await fetch(
          "https://api.spotify.com/v1/search?" +
            new URLSearchParams({ type: "track", limit: 12, q: req.query.q }),
          { headers: { Authorization: "Bearer " + req.query.access_token } }
        );

  var data = await response.json();

  if ("error" in data) {
    return res.redirect(400, "/error?code=Spotify Error");
  }

  data = data?.tracks || data;

  if (data.items.length === 0) {
    return res.status(204).json({ error: "No Tracks Found" });
  }

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.json(data.items);
};
