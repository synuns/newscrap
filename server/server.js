const express = require("express");
const app = express();

const trends = require("./Router/googleTrends");
const news = require("./Router/msnNews");
const newsSearch = require("./Router/msnNewsSearch");
const newsParse = require("./Router/msnNewsParse");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/trends", trends);
app.use("/api/news", news);
app.use("/api/news/search", newsSearch);
app.use("/api/news/article", newsParse);

const port = 5000;
app.listen(port, () => console.log(`Listening on ${port}`));