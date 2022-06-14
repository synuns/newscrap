import React, { Suspense } from 'react'
import KeywordsList from '../Components/Keyword/KeywordList';
import { Box } from '@mui/material';
import { ErrorBoundary } from 'react-error-boundary';
import KeywordListSkeleton from '../Components/Keyword/KeywordListSkeleton';

const Trends = () => {
  return (
    <Box>
      <Suspense fallback={<KeywordListSkeleton/>}>
        <ErrorBoundary FallbackComponent={<div>Error!</div>}>
          <KeywordsList />
        </ErrorBoundary>
      </Suspense>
    </Box>
  )
}

export default Trends;