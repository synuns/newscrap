import React, { Suspense } from 'react'
import KeywordsList from '../Components/KeywordList';
import { Container } from '@mui/material';
import { ErrorBoundary } from 'react-error-boundary';
import KeywordListLoading from '../Components/KeywordListLoading';

const Trends = () => {
  return (
    <Container>
      <Suspense fallback={<KeywordListLoading/>}>
        <ErrorBoundary FallbackComponent={<div>Error!</div>}>
          <KeywordsList />
        </ErrorBoundary>
      </Suspense>
    </Container>
  )
}

export default Trends;