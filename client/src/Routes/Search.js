import React, { Suspense } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Container } from '@mui/material';
import SearchNewsList from '../Components/Search/SearchNewsList';
import NewsListSkeleton from '../Components/News/NewsListSkeleton';


const Search = () => {
  // [searchParams, setSearchParams]
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');

  return (
    <Container>
      <Suspense fallback={<NewsListSkeleton num={20}/>}>
        <SearchNewsList query={query} />
      </Suspense>
    </Container>
  )
}

export default Search;