import React from "react";
import { useQueries } from "react-query";
import NewsCard from "../Components/NewsCard";
import NewsAPI from "../api/NewsAPI";
import NewsSearchAPI from "../api/NewsSearchAPI";
import TrendsAPI from "../api/TrendsAPI";
import { Box, Container, Typography } from "@mui/material";
import KeywordsList from "../Components/KeywordsList";

const News = () => {
  const result = useQueries([
    {
      queryKey: "getNews",
      queryFn: () => NewsAPI()
    },
    {
      queryKey: "getNewsSearch",
      queryFn: () => NewsSearchAPI("")
    },
    {
      queryKey: "getTrends",
      queryFn: () => TrendsAPI()
    }
  ]);

  // useEffect(() =>{
  //   const loadingFinishAll = result.some(result => result.isLoading);
  //   console.log(loadingFinishAll);
  // }, [result]);

  return (
    <Container>
      <Box>
        <Typography>트렌드</Typography>
        {result[2] && <KeywordsList keywords={result[2].data.items} />}
      </Box>
      <Box>
        <Typography>주요 뉴스</Typography>
        {result[0] && result[0].data.value.map((news, idx) => (
          <NewsCard key={idx} news={news} />
        ))}
      </Box>
      <Box>
        <Typography>인기 뉴스</Typography>
        {result[1] && result[1].data.value.map((news, idx) => (
          <NewsCard key={idx} news={news} />
        ))}
      </Box>
    </Container>
  );
}

export default News;