import React, { Suspense } from 'react'
import KeywordsList from '../Components/Keyword/KeywordList';
import KeywordListLoading from '../Components/Keyword/KeywordListLoading';
import { Box } from '@mui/material';
import { ErrorBoundary } from 'react-error-boundary';

const Trends = () => {
  return (
    <Box>
      <Suspense fallback={<KeywordListLoading/>}>
        <ErrorBoundary FallbackComponent={<div>Error!</div>}>
          <KeywordsList />
        </ErrorBoundary>
      </Suspense>
    </Box>
  )
}

export default Trends;