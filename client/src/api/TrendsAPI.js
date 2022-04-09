import axios from "axios";


const TrendsAPI = async () => {
  const keywords = await axios.get("/api/trends")
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
  
  return keywords;
}

export default TrendsAPI;