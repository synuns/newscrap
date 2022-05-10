import React, { Suspense } from "react";
import { Box, Container, Typography } from "@mui/material";
import MajorNewsList from "../Components/MajorNewsList";
import NewsListLoading from "../Components/NewsListLoading";

const News = () => {
  return (
    <Container>
      <Box>
        <Typography variant="h4">오늘의 뉴스</Typography>
        <Suspense fallback={<NewsListLoading/>}>
          <MajorNewsList />
        </Suspense>
      </Box>
    </Container>
  );
}

export default News;