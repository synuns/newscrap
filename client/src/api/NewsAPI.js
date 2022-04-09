import axios from "axios";

const NewsAPI = async () => {
  const newsData = await axios.get("/api/news")
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
  return newsData;
}

export default NewsAPI;