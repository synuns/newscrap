require("dotenv").config({ path: "../.env"})
const express = require("express");
const axios = require("axios");
const url = require('url');
const router = express.Router();

router.get("/", async (req, res) => {
  const queryData = url.parse(req.url, true).query;
	const query = queryData.query;
  const key = process.env.AZURE_KEY;
  const mkt = "ko-kr";
  const options = {
    method: 'get',
    url: "https://api.bing.microsoft.com/v7.0/news/search",
    headers: { 'Ocp-Apim-Subscription-Key': key },
    json: true,
    params: { 
      q: query,
      mkt: mkt,
      sortBy: "date", // or "relevance"
      safeSearch: "off",
      textDecorations: true,
      textFormat: "html",
      originalImg: true,
      // offset: 10
      count: 100,
    }
  }
  await axios(options)
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      res.send(error);
    });
})

module.exports = router;