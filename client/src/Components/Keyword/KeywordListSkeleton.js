import { Box, Skeleton, Typography } from '@mui/material';
import React from 'react';
import KeywordCardSkeleton from './KeywordCardSkeleton';

const KeywordListSkeleton = () => {
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
      {[...Array(3)].map((n, idx) => (
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
          <Typography variant="h4"
            sx={{
              ml: 1,
              mb: 1,
            }}
          >
            <Skeleton sx={{ width: '30%' }}/>
          </Typography>
          {[...Array(5)].map((n, idx) => (
            <KeywordCardSkeleton />
          ))}
        </Box>
      ))}
    </Box>
  );
}

export default KeywordListSkeleton;