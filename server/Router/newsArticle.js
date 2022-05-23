const express = require('express');
const router = express.Router();

const charset = require('charset');
const HTMLParser = require('node-html-parser');
const articleParser = require('article-parser');
const axios = require('axios');

axios.default.withCredentials = true;

const encodeHTML = (headers, body) => {
  const enc = charset(headers, body);
  const encodedHTML = body.toString(enc);
  return encodedHTML;
}

const getHTML = async(url) => {
  const config = {
    method: 'get',
    url: url,
    encoding : 'utf-8',
    headers : { 
      'content-type': 'application/x-www-form-urlencoded',
    },
  };

  const result = await axios(config)
    .then((response) => {
      const html = encodeHTML(response.headers, response.data);
      return html;
    })
    .catch((error) => {
      return error;
    });
  
  return result;
};

const cutQueryFromUrl = (url) => {
  return url.replace(/\?.*/g,'');
}

const getMsnArticle = (html) => {
  const root = HTMLParser.parse(html);

  const articleContent = root.querySelector('.articlecontent');

  const title = articleContent.querySelector('h1').innerHTML;
  const partner = articleContent.querySelector('span.partner');
  const provider = partner.querySelector('a').innerText;
  const providerLogo = partner.querySelector('img').getAttribute('src');
  const published = articleContent.querySelector('.time').innerText;
  const author = articleContent.querySelector('.truncate').innerHTML;
  const image = root.querySelector('span.image').querySelector('img').getAttribute('src');
  const content = root.querySelectorAll('div.richtext');

  const article = {
    title,
    provider,
    providerLogo,
    published,
    author,
    image,
    content,
  };

  Object.keys(article).map(key => {
    article[key] = article[key].toString();
  });

  // 이미지 src 쿼리값 제거
  article.providerLogo = cutQueryFromUrl(article.providerLogo);
  article.image = cutQueryFromUrl(article.image);
  
  return article;
}

const getArticle = (html) => {
  const article = articleParser.extract(html)
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    })
  return article; 
}

router.post("/", (req, res) => {
  const url = req.body.link;

  getHTML(url)
    .then((data) => {
      if(url.includes('www.msn.com')){
        res.send(getMsnArticle(data));
      } else{
        return getArticle(data);
      }
    })
    .then((article) => {
      res.send(article);
    })
    .catch((error) => {
      res.send(error);
    })
});

module.exports = router;