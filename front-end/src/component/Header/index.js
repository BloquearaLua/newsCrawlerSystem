import React,{useEffect, useState} from 'react';
import { useNavigate} from 'react-router-dom';
import pubsub from 'pubsub-js';
import SearchIcon from '@mui/icons-material/Search';
import MoreIcon from '@mui/icons-material/MoreVert';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Box, Toolbar, IconButton, Typography, MenuItem, Menu, Button,  ButtonGroup, Avatar } from '@mui/material';

import { Search,SearchIconWrapper,StyledInputBase } from './Search/SearchInput';
import { pages, settings, logouts} from './constant';

const Header = () => {
  const [keyword,setKeyword] = useState('');
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [isToken,setIsToken] = useState(false);
  const username = localStorage.getItem('username');

  const navigate = useNavigate();

  const menuId = 'web-menu';
  const mobileMenuId = 'mobile-menu';
  const mobileNavId = "mobile-nav";

  const WebMenuParams = {
    id: menuId,
    anchorEl: anchorElUser,
    open: Boolean(anchorElUser),
  };

  const mobileMenuParams = {
    anchorEl: mobileMoreAnchorEl,
    id: mobileMenuId,
    open: Boolean(mobileMoreAnchorEl)
  }

  const mobileNavParams = {
    id: mobileNavId,
    anchorEl: anchorElNav,
    open: Boolean(anchorElNav)
  }

  const useDebounce = (value,delay)  => {
    const [debounceValue,setDebounceValue] = useState(value);
    useEffect(() => {
      let timer = setTimeout(() => {
        setDebounceValue(value)
      },delay);
      return () => {
        clearTimeout(timer)
      }
    },[value,delay]);
    return debounceValue;
  }
  const text = useDebounce(keyword,500);
  useEffect(() => {
    // console.log(text);
    navigate(`/news/keyword=${text}`)
  },[text]);

  const token = localStorage.getItem("token");
  useEffect(() => {
    // console.log("token????");
    if(token){
      setIsToken(true);
    }else{
      setIsToken(false);
    }
    pubsub.subscribe("login",(_,result) => {
      // console.log("overdue",result);
      // const { success } = result;
      // if(success){
        setIsToken(true);
      // }
    })
    pubsub.subscribe("overdue1",handleChangeToken);
    pubsub.subscribe("overdue2",handleChangeToken);
    pubsub.subscribe("overdue3",handleChangeToken);

    return () => {
      pubsub.unsubscribe("login");
      pubsub.unsubscribe("overdue1");
      pubsub.unsubscribe("overdue2");
      pubsub.unsubscribe("overdue3");
    }
  },[]);

  const handleChangeToken = (_,data) => {
    setIsToken(false);
    navigate("/login");
    alert("登录信息已过期，请重新登录！")
  }

  // 打开菜单
  const handleOpen = (type,e) => {
    type === 'web' && setAnchorElUser(e.currentTarget);
    type === 'mobile' && setMobileMoreAnchorEl(e.currentTarget);
    type === 'nav' && setAnchorElNav(e.currentTarget);
  }
  
  // 关闭菜单
  const handleClose = (path) => {
    setAnchorElUser(null);
    setMobileMoreAnchorEl(null);
    setAnchorElNav(null);
    // 如果点击的是登出
    if(path === '/logout'){
      localStorage.clear();
      setIsToken(false);
      navigate('/news');
    }else if(path){
      navigate(path)
    }
  }

  // 点击按钮出现菜单
  const renderMenu = (params,mapList) => {
    // console.log(params,mapList,type);
    const { id, anchorEl,open } = params;
    return (
      <Menu
        sx={{ mt: '40px'}}
        id={id}
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        anchorOrigin= {{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {
          mapList.map((item) => (
            <MenuItem key={item.name} onClick={() => handleClose(item.path)}>
              <Typography textAlign="center">{item.name}</Typography>
            </MenuItem>
          ))
        }
      </Menu>
    )
  }
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" style={{background: "#fff"}}>
        <Toolbar>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="show nav"
                aria-controls={Boolean(anchorElNav) ? 'true' : undefined}
                aria-expanded={Boolean(anchorElNav) ? 'true' : undefined}
                aria-haspopup="true"
                onClick={(e) => handleOpen('nav',e)}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              {renderMenu(mobileNavParams,pages,'nav')}
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            爬虫新闻
          </Typography>
          <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
            {
              pages.map((page) => (
                <Button
                  key={page.name}
                  color='deepColor'
                  onClick={() => {navigate(page.path)}}
                  sx={{ my: 2, display: 'block' }}
                >
                  {page.name}
                </Button>
              ))
            }
          </Box>
          
          <Search >
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="请输入关键词"
              inputProps={{ 'aria-label': 'search' }}
              onChange={(e) => setKeyword(e.target.value) }
              value={keyword}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            {
              isToken ? (
                <Box sx={{flexGrow:0}}>
                  <Typography variant='p' sx={{mr:1}}>
                    {username}
                  </Typography>
                  <IconButton onClick={(e) => handleOpen('web',e)} sx={{ p: 0 }}>
                    <Avatar alt="Remy Sharp" sx={{width:50,height:50}}>{username[0].toUpperCase()}</Avatar>
                  </IconButton>
                  {renderMenu(WebMenuParams,settings,'web')}
                </Box>
              ) :
              (
                <ButtonGroup variant='inherit'>
                  {
                    logouts.map(item => (
                      <Button color='inherit' onClick={() => navigate(item.path)} key={item.name}>{item.name}</Button>
                    ))
                  }
                </ButtonGroup>
              )
            }
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={(e) => handleOpen('mobile',e)}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
              {
                isToken ? 
                (renderMenu(mobileMenuParams,settings,'mobile')) :
                (renderMenu(mobileMenuParams,logouts,'mobile'))
              }
          </Box>
        </Toolbar>
      </AppBar>
      
    </Box>
  );
};
export default Header;