import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useQueries, useQueryErrorResetBoundary } from "react-query";
import { Box, Button, Container, Typography } from "@mui/material";
import NewsAPI from "../api/NewsAPI";
import NewsSearchAPI from "../api/NewsSearchAPI";
import NewsCard from "../Components/NewsCard";
import NewsList from "../Components/NewsList";
import KeywordList from "../Components/KeywordList";


const News = () => {
  const result = useQueries([
    {
      queryKey: "getNews",
      queryFn: () => NewsAPI()
    },
    {
      queryKey: "getNewsSearch",
      queryFn: () => NewsSearchAPI("")
    }
  ]);
  // const { reset } = useQueryErrorResetBoundary();

  // useEffect(() =>{
  //   const loadingFinishAll = result.some(result => result.isLoading);
  //   console.log(loadingFinishAll);
  // }, [result]);

  return (
    <Container>
      <Box>
        <KeywordList />
      </Box>
      <Box>
        <Typography variant="h4">주요 뉴스</Typography>
        {result[0].data.data.value.map((news, idx) => (
          <NewsCard key={idx} news={news} />
        ))}
      </Box>
      <Box>
        <Typography variant="h4">인기 뉴스</Typography>
        {result[1].data.value.map((news, idx) => (
          <NewsCard key={idx} news={news} />
        ))}
      </Box>
    </Container>
  );
}

export default News;