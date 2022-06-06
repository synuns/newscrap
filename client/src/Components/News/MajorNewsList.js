import { Box } from '@mui/material';
import React from 'react';
import { useQuery } from 'react-query';
import NewsAPI from '../../api/NewsAPI';
import NewsCard from '../Common/NewsCard';

const MajorNewsList = () => {
  const majorNews = useQuery(['majorNews'], NewsAPI);

  return (
    <Box>
      {majorNews.data.value.map((news, idx) => (
        <NewsCard key={idx} news={news} />
      ))}
    </Box>
  );
}

export default MajorNewsList;