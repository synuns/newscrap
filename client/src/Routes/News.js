import React, { useEffect, useState } from "react";
import axios from "axios";

const News = () => {
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

export default News;