import React, { Suspense } from "react";
import { Box, Container, Typography } from "@mui/material";
import MajorNewsList from "../Components/News/MajorNewsList";
import NewsListSkeleton from "../Components/News/NewsListSkeleton";

const News = () => {
  return (
    <Container>
      <Box>
        <Typography variant="h4">오늘의 뉴스</Typography>
        <Suspense fallback={<NewsListSkeleton num={10}/>}>
          <MajorNewsList />
        </Suspense>
      </Box>
    </Container>
  );
}

export default News;