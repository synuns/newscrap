import React, { Suspense } from 'react'
import KeywordsList from '../Components/KeywordList';
import { Box } from '@mui/material';
import { ErrorBoundary } from 'react-error-boundary';
import KeywordListLoading from '../Components/KeywordListLoading';

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