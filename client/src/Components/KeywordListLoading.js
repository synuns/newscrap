import { Accordion, Box, Skeleton } from '@mui/material';
import React from 'react';

const KeywordListLoading = () => {
  let skeletons = [];

  const skeleton = (
    <Accordion sx={{ height: '40px'}}>
      <Skeleton sx={{ mx: 2, height: '100%' }} />
    </Accordion>
  );

  for(let i=0; i<20; i++){
    skeletons.push(skeleton);
  };

  return (
    <Box>
      {skeletons}
    </Box>
  );
}

export default KeywordListLoading;