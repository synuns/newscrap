import React from 'react'
import { useQuery } from 'react-query';
import NewsSearchAPI from '../api/NewsSearchAPI';
import NewsCard from '../Components/NewsCard';

const SearchNewsList = ({query}) => {
  const { data } = useQuery(
    "getNewsSearch", 
    () => NewsSearchAPI(query),
    {
      // 동기화 처리(enable option)
      enabled: !!query
    }
  );

  return (
    <>
    {data && data.value.map((news, idx) => (
      <NewsCard key={idx} news={news} />
    ))}
    </>
  )
}


export default SearchNewsList;