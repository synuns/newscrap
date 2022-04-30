import { Box, Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import React from 'react';
import fromNow from '../utils/fromNow';
import htmlDecode from '../utils/htmlDecode';

const NewsCard = ({ news }) => {
  return (
    <Card 
      aria-label="news-card"
      sx={{ display: 'flex', my: 2, height: '180px' }}
    >
      <CardActionArea>
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: 'row', 
            ':hover': { 
              '& .title': {textDecoration: 'underline'} 
            } 
        }}>
          <CardContent>
            <Typography
              fontWeight="bold"
              className="title"
              sx={{ height: '28px', overflow: 'hidden', }}
            >
              {htmlDecode(news.name)}
            </Typography>
            <Typography 
              paragraph 
              className="description"
              sx={{ height: '70px', overflow: 'hidden', textOverflow: 'ellipsis' }}
            >
              {htmlDecode(news.description)}
            </Typography>
            <Typography variant="caption">
              {fromNow(news.datePublished)}
            </Typography>
          </CardContent>
          {news.image &&
            <CardMedia
            component="img"
            image={news.image.thumbnail.contentUrl}
            alt="thumbnail"
            sx={{ width: 150, height: 150, p: 1, borderRadius: 3 }}
          />
          }
        </Box>
      </CardActionArea>
    </Card>
  );
}

export default NewsCard;