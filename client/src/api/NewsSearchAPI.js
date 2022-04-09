import axios from "axios";

const NewsSearchAPI = async (query) => {
  const newsData = await axios.get(`/api/news/search?query=${query}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
  return newsData;
}

export default NewsSearchAPI;