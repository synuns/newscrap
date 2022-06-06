import React, { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import { Card, CardActionArea, CardContent, CardHeader, CardMedia, Divider, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { modals } from '../Modal/Modals';
import useModals from '../../Hook/useModals';
import { Link } from 'react-router-dom';
// import { db } from '../Utils/firebase';
// import { doc } from 'firebase/firestore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import DeleteIcon from '@mui/icons-material/Delete';

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));

const ScrapTemplateCard = ({ title, createdBy, newsCount, images }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { openModal } = useModals();
  const open = Boolean(anchorEl);
  const path = `/scrap/${title}`;
  // const templateDocRef = doc(db, "scrap", title);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = (id) => {
    openModal(modals.editTemplateModal, {
      onSubmit: (value) => {
        //firebase
        console.log(`Edit ${title} to ${value}`);
      },
      id: id,
    }); 
    setAnchorEl(null);
  };

  const handleDuplicate = (id) => {
    openModal(modals.duplicateTemplateModal, {
      onSubmit: (value) => {
        //firebase
        console.log(`Duplicate ${title} to ${value}`);
      },
      id: id,
    });
    setAnchorEl(null);
  }

  const handleDelete = (id) => {
    openModal(modals.deleteTemplateModal, {
      onSubmit: () => {
        //firebase
        console.log(`Delete ${title}`);
      },
      id: id,
    });
    setAnchorEl(null);
  }

  const options = [
    {
      type: "edit",
      name: "수정하기",
      icon: <EditIcon />,
      handler: handleEdit
    },
    {
      type: "duplicate",
      name: "복사하기",
      icon: <FileCopyIcon />,
      handler: handleDuplicate
    },
    {
      type: "delete",
      name: "삭제하기",
      icon: <DeleteIcon />,
      handler: handleDelete
    },
  ];

  return (
    <Card
      sx={{
        mx: 'auto',
        minWidth: 280,
        maxWidth: 320
      }}
    >
      <CardHeader
        title={title}
        subheader={createdBy}
        action={
          <>
            <IconButton 
              aria-label="moreVert"
              onClick={handleClick}
            >
              <MoreVertIcon />
            </IconButton>
            <StyledMenu
              id="long-menu"
              MenuListProps={{
                'aria-labelledby': 'moreVert',
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              {options.map((option) => (
                <MenuItem 
                  key={option.name} 
                  onClick={() => option.handler(title)} 
                >
                  {option.icon}
                  {option.name}
                </MenuItem>
              ))}
            </StyledMenu>
          </>
        }
      />
      <Divider />
      <CardActionArea
        component={Link} to={path}
      >
        <CardMedia
          component="img"
          image={images[0]}
          alt="thumbnail"
          sx={{ height: 150, p: 1, borderRadius: 3 }}
        />
        <CardContent>
          <Typography>{newsCount}개의 스크랩</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default ScrapTemplateCard;