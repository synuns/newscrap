import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container } from "@mui/material";
import NewsCard from "../Components/NewsCard";

const News = () => {
  const [data, setData] = useState("");
  
  const callApi = async () => {
    axios.get("/api/news")
      .then((res) => {
        // console.log(res.data);
        setData(res.data.value);
      })
  };

  useEffect(() =>{
    callApi();
  }, []);

  return (
    <Container>
      {data && data.map((news, idx) => (
        <NewsCard key={idx} news={news} />
      ))}
    </Container>
  );
}

export default News;