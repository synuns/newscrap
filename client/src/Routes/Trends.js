import React, { Suspense } from 'react'
import KeywordsList from '../Components/KeywordList';
import { Container, Typography } from '@mui/material';
import { ErrorBoundary } from 'react-error-boundary';
import KeywordListLoading from '../Components/KeywordListLoading';

const Trends = () => {
  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 2 }}>인기 검색어</Typography>
      <Suspense fallback={<KeywordListLoading/>}>
        <ErrorBoundary FallbackComponent={<div>Error!</div>}>
          <KeywordsList />
        </ErrorBoundary>
      </Suspense>
    </Container>
  )
}

export default Trends;