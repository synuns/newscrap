import React, { useState } from 'react';
import { useQuery } from 'react-query';
import TrendsAPI from '../api/TrendsAPI';
import fromNow from '../utils/fromNow';
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const KeywordList = () => {
  const { data } = useQuery(['trends'], TrendsAPI);

  const [expanded, setExpanded] = useState(false);
  const [selected, setSelected] = useState("");
  // const { data, isLoading, error } = useQuery(
  //   ['relatedNews', selected], 
  //   () => NewsSearchAPI(selected),
  //   {
  //     enabled: !!selected,
  //   }
  // );

  const handleChange = (index, keyword) => (event, isExpanded) => {
    setExpanded(isExpanded ? index : false);
    setSelected(keyword);
  };
  
  return (
    <Box>
      {data.items.map((keyword, idx) => (
        <Accordion 
          expanded={expanded === idx}
          onChange={handleChange(idx, keyword.title)}
          key={idx}
        >
          {(expanded !== idx) && 
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography sx={{ width: '33%', flexShrink: 0 }}>{keyword.title}</Typography>
            <Typography sx={{ flexShrink: 2, color: 'text.secondary' }}>{keyword.traffic}</Typography>
            <Typography sx={{ flexShrink: 2, color: 'text.secondary' }}>{fromNow(keyword.isoDate)}</Typography>
          </AccordionSummary>}
          {(expanded === idx) && 
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography sx={{ width: '80%', flexShrink: 2 }}>{keyword.title}</Typography>
            {/* <Typography sx={{ color: 'text.secondary' }}>{fromNow(keyword.pubDate)}</Typography> */}
          </AccordionSummary>}
          <AccordionDetails>
            <Box>
              {keyword.description.split(",").map((word, idx) => (
                <Button key={idx}>{word}</Button>
                ))
              }
              <img alt="thumbnail" src={keyword.picture} />
            </Box>
            {/* <Box>
              {data}
            </Box> */}
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  )
}

export default KeywordList;