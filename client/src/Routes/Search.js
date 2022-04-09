import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Container } from '@mui/material';
import NewsCard from '../Components/NewsCard';
import { useQuery } from 'react-query';
import NewsSearchAPI from '../api/NewsSearchAPI';

const Search = () => {
  // [searchParams, setSearchParams]
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');
  const { status, data, error } = useQuery(
    "getNewsSearch", 
    () => NewsSearchAPI(query),
    {
      // 동기화 처리(enable option)
      enabled: !!query
    }
  );

  if (status === "loading") {
    return <span>Loading...</span>;
  }
  if (status === "error") {
    return <span>Error: {error.message}</span>;
  }

  return (
    <Container>
      {data && data.value.map((news, idx) => (
        <NewsCard key={idx} news={news} />
      ))}
    </Container>
  )
}

export default Search;