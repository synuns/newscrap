import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AppBar, Avatar, Box, Button, IconButton, InputBase, Toolbar, Typography, Slide, useScrollTrigger, Menu, MenuItem } from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ClearIcon from '@mui/icons-material/Clear';

function HideOnScroll(props) {
  const { appear, children } = props;
  const trigger = useScrollTrigger({});

  return (
    <Slide appear={false} direction="down" in={appear || !trigger}>
      {children}
    </Slide>
  );
}

const Search = styled('form')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  borderBottom: 'solid',
  borderWidth: 2,
  borderColor: 'black',
  marginRight: 3,
  marginLeft: theme.spacing(1),
  width: 'auto',
  height: 32,
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 1),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 4),
    transition: theme.transitions.create('width'),
    width: '16ch',
    [theme.breakpoints.up('780')]: {
      '&:focus': {
        width: '23ch',
      },
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
}));

const pages = [
  ['Home', '/', <HomeIcon />],
  ['Trends', '/trends', <TrendingUpIcon />],
  ['Scrap', '/scrap', <BookmarkIcon />]
];

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const NavBar = () => {
  const [value, setValue] = useState('');
  const [navMenuOpened, setNavMenuOpened] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();

  const onValueChange = useCallback(
    (e) => {
      setValue(e.target.value);
  }, []);

  const handleNavMenuClick = () => {
    setNavMenuOpened(!navMenuOpened);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleResize = () => {
    if(window.innerWidth >= 480){
      setNavMenuOpened(false);
    }
  };

  const handleSearch = () => {
    if(value !== ''){
      navigate(`/search?query=${value}`);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };

  const handleClearButton = () => {
    setValue('');
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    }
  })

  return (
    <HideOnScroll
      appear={navMenuOpened}
    >
      <AppBar 
        position="sticky"
        color="inherit"
        sx={{ boxShadow: 0 }}
      >
        <Toolbar disableGutters>
          <Typography
            variant="h5"
            noWrap
            component="div"
            fontFamily="Alfa Slab One"
            sx={{ mx: 2, display: { xs: 'none', sm: 'flex' } }}
          >
            NEWSCRAP
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex', md: 'none' } }}>
            {pages.map((page) => (
              <Button
                key={page[0]}
                disableRipple
                variant="text"
                fontFamily="Pretendard"
                component={Link} to={page[1]}
                sx={{ my: 2, color: 'black' }}
              >
                {page[0]}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page[0]}
                disableRipple
                variant="text"
                size="large"
                fontFamily="Pretendard"
                startIcon={page[2]}
                component={Link} to={page[1]}
                sx={{ my: 2, color: 'black' }}
              >
                {page[0]}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', sm: 'none' } }}>
            <IconButton
              size="large"
              aria-label="menu button"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleNavMenuClick}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Box>

          <Typography
            variant="h5"
            noWrap
            component="div"
            fontFamily="Alfa Slab One"
            sx={{ flexGrow: 1, display: { xs: 'flex', sm: 'none' } }}
          >
            NEWSCRAP
          </Typography>
          
          <Box
            sx={{ display: { xs: 'none', sm: 'flex' } }}
          >
            <Search onSubmit={handleSubmit}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                value={value}
                onChange={onValueChange}
                placeholder="뉴스 검색"
                inputProps={{ 'aria-label': 'search' }}
              />
              <IconButton
                disableRipple
                onClick={handleClearButton}
                sx={ 
                  value 
                    ? { visibility: 'visible' } 
                    : { visibility: 'hidden', pointerEvents: 'none' } 
                }
              >
                <ClearIcon fontSize="small" />
              </IconButton>
            </Search>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Button
              disableRipple
              disableFocusRipple
              onClick={handleOpenUserMenu} 
              sx={{ p: 0 }}
            >
              <Avatar 
                alt="Profile" 
                src="/images/profile.png" 
                sx={{ width: 32, height: 32 }}
              />
              <ArrowDropDownIcon 
                sx={ anchorElUser ? {color:'gray'} : { color : 'black'}}
              />
            </Button>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>

        <Box
          sx={ 
            navMenuOpened 
            ? { display : { xs : 'block', sm : 'none'} } 
            : { display : 'none' } 
          }
        >
          <Toolbar>
            <Search onSubmit={handleSubmit}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="뉴스 검색"
                inputProps={{ 'aria-label': 'search' }}
                value={value}
                onChange={onValueChange}
              />
              <IconButton
                disableRipple
                onClick={handleClearButton}
                sx={ 
                  value 
                    ? { visibility: 'visible' } 
                    : { visibility: 'hidden', pointerEvents: 'none' } 
                }
              >
                <ClearIcon fontSize="small" />
              </IconButton>
            </Search>
          </Toolbar>
          {pages.map((page) => (
            <Toolbar
              key={page[0]}
            >
              <Box
                fontFamily="Pretendard"
                onClick={handleNavMenuClick}
                component={Link} to={page[1]}
                sx={[
                  { '&:hover' : { color: 'gray'} },
                  { display: 'flex', 
                    justifyContent: 'center', 
                    textAlign: 'center', 
                    color: 'black', 
                    pl: 2 
                  }
                ]}
              >
                {page[2]}
                <Typography
                  sx={{ ml: 1 }}
                >
                  {page[0]}
                </Typography>
              </Box>
            </Toolbar>
          ))}
        </Box>
      </AppBar>
    </HideOnScroll>
  );
}

export default NavBar