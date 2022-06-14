import React from 'react';
import { Box, Button, Card, CardContent, CardMedia, Typography } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { fromNow } from '../../Utils/time';
import htmlDecode from '../../Utils/htmlDecode';
import { useNavigate } from 'react-router-dom';

const KeywordCard = ({image, title, traffic, isoDate, description, news}) => {
  const navigate = useNavigate();

  const handleSearch = (value) => {
    navigate(`/search?query=${value}`);
  }

  return (
    <Card
      sx={{
        mx: 1,
        mb: 2,
      }}
    >
      <CardContent
        sx={{
          display: 'flex',
          width: '100%',
        }}
      >
        <CardMedia 
          component="img"
          image={image}
          alt="thumbnail"
          sx={{ 
            width: '120px',
            height: '120px',
            borderRadius: '10%',
            mr: 2,
          }}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography
            variant="h5"
            onClick={()=>handleSearch(title)}
            sx={[
              { '&:hover' : { textDecoration: 'underline' } },
              { 
                display: 'block', 
                mb: 1 
              }
            ]}
          >
            {title}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <VisibilityIcon sx={{ color: 'text.secondary' }}/>
            <Typography sx={{ display: 'inline', color: 'text.secondary' }}>{traffic}</Typography>
            <AccessTimeIcon  sx={{ ml: 1, color: 'text.secondary' }}/>
            <Typography sx={{ display: 'inline', color: 'text.secondary' }}>{fromNow(isoDate)}</Typography>
          </Box>
            {description && 
              <Box>
                <Typography sx={{ display: 'block' }}>관련 검색어</Typography>
                {description.split(",").map((word, idx) => (
                  <Button
                    key={idx}
                    onClick={() => handleSearch(word)}
                  >
                    {word}
                  </Button>
                ))}
              </Box>
            }
          <Box
            sx={{ 
              width: '100%',
            }}
          >
            {news.map((item, idx) => (
              <Typography 
                key={idx}
                sx={{
                  width: '100%',
                  height: '20px',
                  display: 'inline-block',
                  overflow: 'hidden', 
                  textOverflow: 'ellipsis',
                }}
              >
                {htmlDecode(item[Object.keys(item)[0]])}
              </Typography>
            ))}
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

export default KeywordCard;