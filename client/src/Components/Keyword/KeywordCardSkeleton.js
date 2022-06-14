import { Box, Card, CardContent, Skeleton, Typography } from '@mui/material';
import React from 'react'

const KeywordCardSkeleton = () => {
  return (
    <Card
      sx={{
        mx: 1,
        mb: 2,
      }}
    >
      <CardContent
        sx={{
          display: 'flex',
          width: '100%'
        }}
      >
        <Box
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', m: 1, }}
        >
          <Skeleton 
            variant="rectangular"
            sx={{ width: 120, height: 120, borderRadius: 3 }}
          />
      </Box>
        <Box
          sx={{ width: '100%' }}
        >
          <Typography variant="h4" >
            <Skeleton sx={{ width: '50%' }}/>
          </Typography>
          <Typography variant="h5" >
            <Skeleton sx={{ width: '70%' }}/>
          </Typography>
          <Typography>
            <Skeleton sx={{ height: '60px', width: '100%' }}/>
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
}

export default KeywordCardSkeleton;