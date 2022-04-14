import React, { Suspense } from "react";
import { Box, Container, Typography } from "@mui/material";
import MajorNewsList from "../Components/MajorNewsList";
import KeywordList from "../Components/KeywordList";
import KeywordListLoading from "../Components/KeywordListLoading";
import NewsListLoading from "../Components/NewsListLoading";


const News = () => {
  return (
    <Container>
      <Box>
        <Suspense fallback={<KeywordListLoading/>}>
          <KeywordList />
        </Suspense>
      </Box>
      <Box>
        <Typography variant="h4">주요 뉴스</Typography>
        <Suspense fallback={<NewsListLoading/>}>
          <MajorNewsList />
        </Suspense>
      </Box>
    </Container>
  );
}

export default News;