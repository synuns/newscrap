import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from "axios";
import { Container } from '@mui/material';
import NewsCard from '../Components/NewsCard';

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState("");
  const query = searchParams.get('query');

  const callApi = async () => {
    axios.get(`/api/news/search?query=${query}`)
      .then((res) => {
        console.log(res.data);
        setData(res.data.value);
      })
  };

  useEffect(() =>{
    callApi(query);
  }, []);

  return (
    <Container>
      {data && data.map((news, idx) => (
        <NewsCard key={idx} news={news} />
      ))}
    </Container>
  )
}

export default Search;