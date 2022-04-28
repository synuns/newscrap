import React, { Suspense } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Container } from '@mui/material';
import SearchNewsList from '../Components/SearchNewsList';
import NewsListLoading from '../Components/NewsListLoading';


const Search = () => {
  // [searchParams, setSearchParams]
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');

  return (
    <Container>
      <Suspense fallback={NewsListLoading}>
        <SearchNewsList query={query} />
      </Suspense>
    </Container>
  )
}

export default Search;