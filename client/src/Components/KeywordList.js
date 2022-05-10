import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import _ from 'lodash';
import moment from 'moment';
import TrendsAPI from '../api/TrendsAPI';
import fromNow from '../utils/fromNow';
import htmlDecode from '../utils/htmlDecode';
import { Box, Button, Card, CardContent, CardMedia, Typography } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useNavigate } from 'react-router-dom';

const KeywordList = () => {
  const { data } = useQuery(['trends'], TrendsAPI);
  const [keywordByDate, setKeywordByDate] = useState({});
  const navigate = useNavigate();

  // const handleChange = (keywordTitle) => (_, isExpanded) => {
  //   setExpanded(isExpanded ? keywordTitle : false);
  // };

  const handleSearch = (value) => {
    navigate(`/search?query=${value}`);
  }

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
          return  moment(nextKey, dateForm) - moment(prevKey, dateForm);
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
            <Card
              key={idx}
              sx={{
                mx: 1,
                mb: 2,
              }}
            >
              <CardContent
                sx={{
                  display: 'flex',
                  width: '100%',
                }}
              >
                <CardMedia 
                  component="img"
                  image={keyword.picture}
                  alt="thumbnail"
                  sx={{ 
                    width: '120px',
                    height: '120px',
                    borderRadius: '10%',
                    mr: 2,
                  }}
                />
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography 
                    variant="h5"
                    onClick={()=>handleSearch(keyword.title)}
                    sx={[
                      { '&:hover' : { textDecoration: 'underline' } },
                      { 
                        display: 'block', 
                        mb: 1 
                      }
                    ]}
                  >
                    {keyword.title}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <VisibilityIcon sx={{ color: 'text.secondary' }}/>
                    <Typography sx={{ display: 'inline', color: 'text.secondary' }}>{keyword.traffic}</Typography>
                    <AccessTimeIcon  sx={{ ml: 1, color: 'text.secondary' }}/>
                    <Typography sx={{ display: 'inline', color: 'text.secondary' }}>{fromNow(keyword.isoDate)}</Typography>
                  </Box>
                    {keyword.description && 
                      <Box>
                        <Typography sx={{ display: 'block' }}>관련 검색어</Typography>
                        {keyword.description.split(",").map((word, idx) => (
                          <Button 
                            key={idx}
                            onClick={() => handleSearch(word)}
                          >
                            {word}
                          </Button>
                        ))}
                      </Box>
                    }
                  <Box
                    sx={{ 
                      width: '100%',
                    }}
                  >
                    {keyword.news.map((item, idx) => (
                      <Typography 
                        key={idx}
                        sx={{
                          width: '100%',
                          height: '20px',
                          display: 'inline-block',
                          overflow: 'hidden', 
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {htmlDecode(item[Object.keys(item)[0]])}
                      </Typography>
                    ))}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      ))}
    </Box>
  )
}

export default KeywordList;