import { Box } from '@mui/material';
import React from 'react';
import { useQuery } from 'react-query';
import NewsAPI from '../api/NewsAPI';
import NewsCard from './NewsCard';

const MajorNewsList = () => {
  const { data } = useQuery(['majorNews'], NewsAPI);

  return (
    <Box>
      {data.value.map((news, idx) => (
        <NewsCard key={idx} news={news} />
      ))}
    </Box>
  );
}

export default MajorNewsList;