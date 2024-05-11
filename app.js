const express = require("express");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/", function (req, res) {
  res.send("Hi there");
});

app.post("/translate", async (req, res) => {
  // Check if the request body contains the "text" field
  if (!req.body || !req.body.text) {
    return res
      .status(400)
      .json({ error: 'Request body must contain a "text" field.' });
  }

  const { text } = req.body;
  const url =
    "https://google-translate113.p.rapidapi.com/api/v1/translator/text";
  const options = {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "X-RapidAPI-Key": "bc7adfde1dmsh5ef5d04589ab7a0p100dd5jsn5ac40fd731aa",
      "X-RapidAPI-Host": "google-translate113.p.rapidapi.com",
    },
    body: new URLSearchParams({
      from: "auto",
      to: "fr",
      text: text,
    }),
  };

  try {
    const response = await fetch(url, options);
    const result = await response.text();
    const { trans } = await JSON.parse(result);
    return res.status(200).json({"translation":trans});
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
