import React, { useState } from 'react'
import { Card, CardActions, CardContent, CardMedia, IconButton, Typography } from '@mui/material';
import { changeFormat } from '../../Utils/time';
import ArticleIcon from '@mui/icons-material/Article';
import LinkIcon from '@mui/icons-material/Link';
import DeleteIcon from '@mui/icons-material/Delete';

const ScrapNewsCard = ({ data }) => {
  const { id, title, image, url, published, createdBy, content } = data;
  // const { openModal } = useModals();

  const handleClickArticle = () => {
    console.log('article');
  };

  const handleClickLink = () => {
    window.open(url);
  };

  return (
    <Card
      sx={{
        mx: 'auto',
        minWidth: 280,
        maxWidth: 320
      }}
      >
        <CardMedia
          component="img"
          image={image}
          alt="thumbnail"
          sx={{ width: '100%', height: 200 }}
        />
      <CardContent>
        <Typography sx={{ fontWeight: 'bold' }}>{title}</Typography>
        <Typography variant="caption">발행 {changeFormat(published, 'L')} </Typography>
        <Typography variant="caption">스크랩 {changeFormat(createdBy.toDate(), 'L')}</Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          onClick={handleClickArticle}
        >
          <ArticleIcon />
        </IconButton>
        <IconButton
          onClick={handleClickLink}
        >
          <LinkIcon />
        </IconButton>
        <IconButton
          sx={{
            marginLeft: 'auto',
          }}
        >
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  )
}

export default ScrapNewsCard;