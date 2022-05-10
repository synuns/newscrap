const express = require('express');
const router = express.Router();

const HTMLParser = require('node-html-parser');
const charset = require('charset');
const axios = require('axios');

const newsParser = (headers, body) => {
  let enc = charset(headers, body); // 사이트 charset

  const i_result = body.toString(enc);
  const root = HTMLParser.parse(i_result);

  // const title = root.querySelector('.viewTitle');
  // const content = root.querySelector('.views-article-body') - root.querySelector('.related_art_khan');
  const image = root.querySelector('.article-image').getAttribute('src');
  // console.log(image);
  // const imageCaption = root.querySelector('.image-caption');
  // const provider = root.querySelector('.viewsAttribution');
  // const providerLogo = root.querySelector('.providerLogo').getAttribute('src');
  // const reporter = root.querySelector('.ab_byline');

  let article = {
    title: title,
    content: content,
    image: image,
    imageCaption: imageCaption,
    provider: provider,
    providerLogo: providerLogo,
    reporter: reporter,
  };

  article = JSON.parse(article);

  return article;
}

router.post("/", async (req, res) => {
  const options = {
    url : req.body.link,
    encoding : null,
    // headers : {
    //   // request 차단 설정
    //   'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36',
    // },
  };

  await axios(options)
    .then((response) => {
      // const news = newsParser(response.headers, response.data);
      // console.log(response.data);
      res.send(response.data);
    })
    .catch((error) => {
      res.send(error);
    });
});

module.exports = router;