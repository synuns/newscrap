require("dotenv").config({ path: "../.env"})
const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/", async (req, res) => {
  // bing major news api
  // const url = "https://api.bing.microsoft.com/v7.0/news";
  // bing news serach api
  const url = "https://api.bing.microsoft.com/v7.0/news/search";
  const key = process.env.AZURE_KEY;
  const query = "스포츠";
  const mkt = "ko-kr";
  const options = {
    method: 'get',
    url: url,
    headers: { 'Ocp-Apim-Subscription-Key': key },
    json: true,
    params: { 
      q: query, 
      mkt: mkt,
      sortBy: "date", // or "relevance"
      // originalImg: true, 
      textDecorations: true, // hightlight option
      // offset: 10
      count: 10,
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