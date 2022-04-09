import React from 'react';
import { Box, Typography } from '@mui/material';

const KeywordsList = ({ keywords }) => {
  return (
    <Box>
      {keywords.map((keyword, idx) => (
        <Box key={idx}>
          <Typography>{keyword.title}</Typography>
          <Typography>{keyword.link}</Typography>
          <Typography>{keyword.pubDate}</Typography>
          <Typography>{keyword.traffic}</Typography>
          <Typography>{keyword.description}</Typography>
        </Box>  
      ))}
    </Box>
  )
}

export default KeywordsList;