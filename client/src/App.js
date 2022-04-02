import { CssBaseline } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import NavBar from "./Components/NavBar";

function App() {
  const [data, setData] = useState("");
  const callApi = async () => {
    axios.get("/api/news")
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
  };

  useEffect(() =>{
    callApi();
  }, []);

  return (
    <div>
      <CssBaseline />
      <NavBar />
      {data && data.value.map((news, idx) => (
        <div className="news" key={idx}>
          <div>{news.name}</div>
          <div>{news.description}</div>
          <div>{news.datePublished}</div>
          {news.image && 
            <img alt="thumbnail" src={news.image.thumbnail.contentUrl} />
          }
        </div>
      ))}
    </div>
  );
}

export default App;
