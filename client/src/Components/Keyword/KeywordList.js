import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import TrendsAPI from '../../api/TrendsAPI';
import { Box, Typography } from '@mui/material';
import _ from 'lodash';
import moment from 'moment';
import KeywordCard from './KeywordCard';

const KeywordList = () => {
  const { data } = useQuery(['trends'], TrendsAPI);
  const [keywordByDate, setKeywordByDate] = useState({});

  // const handleChange = (keywordTitle) => (_, isExpanded) => {
  //   setExpanded(isExpanded ? keywordTitle : false);
  // };

  const splitKeywordByDate = (keywords) => {
    let keywordByDate = {};
    const dateForm = 'YYYY-MM-DD';
    _.forEach(keywords, (keyword) => {
      const keywordDate = moment(keyword.pubDate).format(dateForm);
      if(!Object.hasOwn(keywordByDate, keywordDate)){
        keywordByDate[keywordDate] = [];
      } 
      keywordByDate[keywordDate].push(keyword);
    })
    //날짜 정렬 필요
    keywordByDate = Object.keys(keywordByDate)
      .sort(
        (prevKey, nextKey) => {
          return moment(nextKey, dateForm) - moment(prevKey, dateForm);
        }
      )
      .reduce(
        (sortedKeyword, key) => {
          sortedKeyword[key] = keywordByDate[key];
          return sortedKeyword;
        }, []
    );
    return keywordByDate;
  }

  useEffect(() => {
    setKeywordByDate(splitKeywordByDate(data.items));
  }, [data]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'column', md: 'row' },
        alignItems: { xs: 'center', sm: 'center', md: 'flex-start'},
        justifyContent: 'center',
        width: '100%',
      }}
    >
      {Object.keys(keywordByDate).map((date, idx) => (
        <Box 
          key={idx}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
            width: '100%',
            maxWidth: '620px',
            mx: 2,
            mb: 2,
          }}
        >
          <Typography variant="h5"
            sx={{
              width: '100%',
              ml: 1,
              mb: 1,
            }}
          >
            {moment(date).format('YYYY년 MM월 DD일')}
          </Typography>
          {keywordByDate[date].map((keyword, idx) => (
            <KeywordCard 
              key={idx}
              image={keyword.picture}
              title={keyword.title}
              traffic={keyword.traffic}
              isoDate={keyword.isoDate}
              description={keyword.description}
              news={keyword.news}
            />
          ))}
        </Box>
      ))}
    </Box>
  )
}

export default KeywordList;