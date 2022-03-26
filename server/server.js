const express = require("express");
const app = express();
const bingNews = require("./Router/bingNewsApi");

app.use("/api/news", bingNews);

const port = 5000;
app.listen(port, () => console.log(`Listening on ${port}`));