require("dotenv").config({ path: "../.env"})
const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/", async (req, res) => {
  const url = "https://api.bing.microsoft.com/v7.0/news";
  const key = process.env.AZURE_KEY;
  const mkt = "ko-kr";
  const options = {
    method: 'get',
    url: url,
    headers: { 'Ocp-Apim-Subscription-Key': key },
    json: true,
    params: { 
      mkt: mkt,
      sortBy: "date",
      safeSearch: "off",
      count: 12,
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