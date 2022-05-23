import React from 'react';
import { Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Tooltip, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useQuery } from 'react-query';
import NewsArticleAPI from '../api/NewsArticleAPI';
import useModals from '../Hook/useModals';
import { modals } from '../Components/Modals';
import moment from 'moment';
import htmlDecode from '../Utils/htmlDecode';
import Grow from '@mui/material/Grow';
import CloseIcon from '@mui/icons-material/Close';
import StarIcon from '@mui/icons-material/Star';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import LinkIcon from '@mui/icons-material/Link';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Grow ref={ref} {...props} />;
});

// 1. 뉴스 데이터가 없는 경우 처리
// 2. 로딩 에러 상태 처리
const NewsModal = ({ onClose, url }) => {
  const { openModal } = useModals();
  const { data, isLoading, Error } = useQuery(
    ['newsArticle', url], 
    () => NewsArticleAPI(url),
    {
      enabled: !!url,
      suspense: false
    }
  );

  // 전역 themeprovider 시 삭제
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClickScrap = () => {
    openModal(modals.scrapModal, {
      data: data,
    });
  };

  const handleClickCancel = () => {
    onClose();
  };

  const handleClickOrigin = () => {
    window.open(url);
  }

  const handleClickCopy = () => {
    navigator.clipboard.writeText(url);

    //alert 변경 필요
    alert('복사 완료');
  }

  if(Error) return <div>Error!</div>;
  if(isLoading) return <div>Loading...</div>;
  return (
    <Dialog
      open={true}
      onClose={onClose}
      fullScreen={fullScreen}
      fullWidth
      scroll='paper'
      TransitionComponent={Transition}
      aria-labelledby="news-title"
      aria-describedby="news-content"
      maxWidth="lg"
    >
      <DialogActions
        disableSpacing
      >
        <Tooltip title="닫기">
          <IconButton 
            // color="primary"
            onClick={handleClickCancel}
          >
            <CloseIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="스크랩">
          <IconButton 
            // color="primary"
            onClick={handleClickScrap}
          >
            <StarIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="링크복사">
          <IconButton 
            // color="primary"
            onClick={handleClickCopy}
          >
            <LinkIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="원문보기">
          <IconButton 
            // color="primary"
            onClick={handleClickOrigin}
          >
            <OpenInNewIcon />
          </IconButton>
        </Tooltip>
      </DialogActions>
      <DialogTitle id="news-title">
        {
          data.provider &&
          <Box 
            sx={{ 
              display : 'flex',
              alignItems: 'center',
              md: 1,
            }}
          >
            <img alt="prov" width="28px" src={data.providerLogo}/>
            <Typography>{data.provider}</Typography>
          </Box>
        }
        <Box>
          <Typography variant="h4">{htmlDecode(data.title)}</Typography>
          <Typography>{moment(data.published).format('llll')}</Typography>
        </Box>
      </DialogTitle>
      <DialogContent dividers>
        <DialogContentText
          id="news-content"
          dangerouslySetInnerHTML={{
            __html: data.content
          }}
          tabIndex={-1}
        >
        </DialogContentText>
      </DialogContent>
  </Dialog>
  );
}

export default NewsModal;