import { Container, Typography } from '@mui/material';
import React from 'react'
import { useParams } from "react-router";
import ScrapNewsList from '../Components/Scrap/ScrapNewsList';

const Template = () => {
  const { template } = useParams();

  return (
    <Container>
      <Typography variant="h4">{template}</Typography>
      <ScrapNewsList id={template} />
    </Container>
  );
}

export default Template;