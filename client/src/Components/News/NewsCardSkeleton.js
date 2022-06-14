import { Box, Card, Skeleton, Typography } from '@mui/material';
import React from 'react'

const NewsCardSkeleton = () => {
  return (
    <Card 
      aria-label="news-card"
      sx={{ display: 'flex', my: 2, height: '180px' }}
    >
      <Box
        sx={{ m: 2, width: '80%'}}
      >
        <Typography>
          <Skeleton width="100%"/>
        </Typography>
        <Typography>
          <Skeleton height="110px" width="100%"/>
        </Typography>
        <Typography>
          <Skeleton width="20%"/>
        </Typography>
      </Box>
      <Box
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', m: 1, }}
      >
        <Skeleton 
          variant="rectangular"
          sx={{ width: 150, height: 150, p: 1, borderRadius: 3 }}
        />
      </Box>
    </Card>
  )
}

export default NewsCardSkeleton;