import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import {useHistory} from 'react-router-dom'
import { AuthContext } from '../Context/AuthContext';
import { makeStyles } from '@mui/styles';
import insta from '../Assets/insta.jpg'
import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import Avatar from "@mui/material/Avatar";

export default function Navbar(props) {
  const userData=props.user
  console.log(userData,'in profile')
  const {logout}= React.useContext(AuthContext)
  const history=useHistory()
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const useStyles=makeStyles({
    text1:{
      backgroundColor:'white'
    }
  })
  const classes=useStyles()
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const handleProfile=()=>{
 history.push(`/profile/${userData.userId}`)
  }
  const handleLogout=async()=>{
   await logout();
   history.push('/login')
  }
  const handlebannerClick=()=>{

  }
  const handleExplore=()=>{
    let newWindow=window.open('https://www.google.com','_blank')
    //tab switch kr dena
    newWindow.focus()
  }

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleProfile}><AccountCircle/><p>&nbsp;</p>Profile</MenuItem>
      <MenuItem onClick={handleLogout}><LogoutIcon/><p>&nbsp;</p> Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
       <MenuItem onClick={handleProfile}><AccountCircle/><p>&nbsp;</p>Profile</MenuItem>
      <MenuItem onClick={handleLogout}><LogoutIcon/><p>&nbsp;</p> Logout</MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed"  sx={{background:'white'}}>
        <Toolbar>
          <div >
            <img src={insta}style={{width:'30vh'}} onClick={handlebannerClick}/>
          </div>
          
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' },color:'black', alignItems:'center',marginRight:'1rem' }}>
          <HomeIcon onClick={handlebannerClick} sx={{marginRight:'2rem',cursor:'pointer'}}/>
          <ExploreIcon onClick={handleExplore} sx={{marginRight:'1.5rem',cursor:'pointer'}}/>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
             <Avatar src={userData.profileUrl} sx={{height:'2.2rem',width:'2.1rem'}}/>
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}