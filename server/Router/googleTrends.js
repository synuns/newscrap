const express = require("express");
const router = express.Router();

const Parser = require('rss-parser');
const parser = new Parser({
  customFields: {
    item: [
      ['title','title'],
      ['ht:approx_traffic', 'traffic'],
      ['description', 'description'],
      ['ht:picture','picture'],
      ['ht:picture_source','picture_source'],
      ['ht:news_item','news', {keepArray: true}],
    ],
  }
});

router.get("/", (req, res) => {
  (async () => {
    let feed = await parser.parseURL('https://trends.google.co.kr/trends/trendingsearches/daily/rss?geo=KR');
    res.send(feed);
  })();
});

module.exports = router;