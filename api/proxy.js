import fetch from "node-fetch";
import qs from "querystring";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send("Method not allowed");
  }

  try {
    const target = "https://groupsor.link/data/addgroup";

    const response = await fetch(target, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": "Mozilla/5.0 (Vercel Proxy)",
      },
      body: qs.stringify(req.body),
    });

    const text = await response.text();
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.status(response.status).send(text);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
