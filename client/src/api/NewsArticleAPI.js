import axios from "axios";

const NewsArticleAPI = async (link) => {
  const newsArticle = await axios.post("/api/news/article", { link })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
  
  return newsArticle;
}

export default NewsArticleAPI;