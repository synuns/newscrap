const express = require('express');
const router = express.Router();

const charset = require('charset');
const HTMLParser = require('node-html-parser');
const articleParser = require('article-parser');
const https = require('https');
const axios = require('axios');

axios.default.withCredentials = true;

const msnNewsParser = (headers, body) => {
  let enc = charset(headers, body);

  const i_result = body.toString(enc);
  const root = HTMLParser.parse(i_result);

  const articleContent = root.querySelector('.articlecontent');

  const title = articleContent.querySelector('h1').innerHTML;
  const partner = articleContent.querySelector('span.partner');
  const provider = partner.querySelector('a').innerText;
  const providerLogo = partner.querySelector('img').getAttribute('src');
  const published = articleContent.querySelector('.time').innerText;
  const author = articleContent.querySelector('.truncate').innerHTML;
  // const image = root.querySelector('span.image').querySelector('img').getAttribute('src');
  // const imageCaption = root.querySelector('caption').innerText;
  const content = root.querySelectorAll('div.richtext');

  const article = {
    title,
    provider,
    providerLogo,
    published,
    author,
    // image,
    // imageCaption,
    content,
  };

  Object.keys(article).map(key => {
    article[key] = article[key].toString();
  });

  return article;
}

const getMsnArticle = async (url) => {
  const httpsAgent = new https.Agent({ keepAlive: true });
  const config = {
    httpsAgent,
    method: 'get',
    url: url,
    encoding : null,
    headers : { 
      'content-type': 'application/x-www-form-urlencoded',
    },
  };

  const result = await axios(config)
    .then((response) => {
      const article = msnNewsParser(response.headers, response.data);
      // console.log(response.data);
      // console.log(article);
      // return response.data;
      return article;
    })
    .catch((error) => {
      return error;
    });
  
  return result;
}

const getArticle = async (url) => {
  try {
    const article = await articleParser.extract(url)
    return article;
  } catch (error) {
    console.trace(err)
    return error;
  }
}

router.post("/", (req, res) => {
  const url = req.body.link;
  const result = url.includes('www.msn.com') ? getMsnArticle(url) : getArticle(url);
  result
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.send(error);
    });
});

module.exports = router;