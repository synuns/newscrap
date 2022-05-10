import React from 'react';
import { Box, Button, Modal } from '@mui/material';
import { useQuery } from 'react-query';
import NewsArticleAPI from '../api/NewsArticleAPI';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const NewsModal = ({ onSubmit, onClose, url }) => {
  const { data, isLoading, Error } = useQuery(
    ['newsArticle', url], 
    () => NewsArticleAPI(url),
    {
      enabled: !!url,
      suspense: false
    }
  );
  
  const handleClickSubmit = () => {
    onSubmit();
  };

  const handleClickCancel = () => {
    onClose();
  };

  if(Error) return <div>Error!</div>;
  return (
    <Modal
      open={true}
      onClose={onClose}
    >
      <Box sx={{ ...style }}>
        { Error &&
          <span>Error!</span>
        }
        {
          isLoading && 
          <div>Loading ...</div>
        }
        {
          !isLoading && 
          <div>{data}</div>
        }
        <Button onClick={handleClickSubmit}>확인</Button>
        <Button onClick={handleClickCancel}>취소</Button>
      </Box>
    </Modal>
  );
}

export default NewsModal;