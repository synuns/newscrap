import React from 'react';
import { Container, Typography } from '@mui/material';
import ScrapList from '../Components/ScrapList';

const Scrap = () => {

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 2 }} >스크랩 목록</Typography>
      <ScrapList />
    </Container>
  );
}

export default Scrap;