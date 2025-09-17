import express from "express";
import fetch from "node-fetch";

const app = express();

app.get("/proxy", async (req, res) => {
  const targetUrl = req.query.url;
  if (!targetUrl) {
    return res.status(400).send("Missing ?url= parameter");
  }

  try {
    const response = await fetch(targetUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; FlyProxy/1.0)"
      }
    });

    const body = await response.text();
    res.set("Content-Type", response.headers.get("content-type") || "text/html");
    res.send(body);
  } catch (err) {
    res.status(500).send("Proxy error: " + err.message);
  }
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Proxy running on port ${port}`);
});
