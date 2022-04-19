import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import _ from 'lodash';
import moment from 'moment';
import TrendsAPI from '../api/TrendsAPI';
import fromNow from '../utils/fromNow';
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const KeywordList = () => {
  const { data } = useQuery(['trends'], TrendsAPI);
  const [expanded, setExpanded] = useState(false);
  const [keywordByDate, setKeywordByDate] = useState({});

  const handleChange = (keywordTitle) => (_, isExpanded) => {
    setExpanded(isExpanded ? keywordTitle : false);
  };

  const splitKeywordByDate = (keywords) => {
    let keywordByDate = {};
    _.forEach(keywords, (keyword) => {
      const dateForm = 'YYYY-MM-DD';
      const keywordDate = moment(keyword.isoDate, dateForm).format(dateForm);
      if(!Object.hasOwn(keywordByDate, keywordDate)){
        keywordByDate[keywordDate] = [];
      } 
      keywordByDate[keywordDate].push(keyword);
    })
    return keywordByDate;
  }

  useEffect(() => {
    setKeywordByDate(splitKeywordByDate(data.items));
  }, [data]);

  return (
    <Box>
      {Object.keys(keywordByDate).map((date, idx) => (
        <Box 
          key={idx}
          sx={{
            mb: 2
          }}
        >
          <Typography variant="h5">{moment(date).format('YYYY년 MM월 DD일')}</Typography>
          {keywordByDate[date].map((keyword, idx) => (
            <Accordion 
              expanded={expanded === keyword.title}
              onChange={handleChange(keyword.title)}
              key={idx}
            >
              {(expanded !== keyword.title) && 
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6" sx={{ width: '50%', flexShrink: 0 }}>{keyword.title}</Typography>
                  <Typography sx={{ display:'flex', color: 'text.secondary' }}>{keyword.traffic}</Typography>
                  <Typography sx={{ display:'flex', color: 'text.secondary' }}>{fromNow(keyword.isoDate)}</Typography>
                </AccordionSummary>
              }
              {(expanded === keyword.title) && 
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography sx={{ width: '80%', flexShrink: 2 }}>{keyword.title}</Typography>
                </AccordionSummary>
              }
              <AccordionDetails>
                <Box>
                  {keyword.description.split(",").map((word, idx) => (
                    <Button key={idx}>{word}</Button>
                    ))
                  }
                  <img alt="thumbnail" src={keyword.picture} />
                </Box>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      ))}
    </Box>
  )
}

export default KeywordList;