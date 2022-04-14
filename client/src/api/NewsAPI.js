import axios from "axios";

const NewsAPI = async () => {
  // const newsData = await axios.get("/api/news")
  const newsData = await axios.get("http://localhost:3000/data/majorNewsData.json")
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
  
  return newsData;
}

export default NewsAPI;