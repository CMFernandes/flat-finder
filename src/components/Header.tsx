import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import ApartmentIcon from '@mui/icons-material/Apartment';

import { useNavigate } from 'react-router-dom';
import useAuthContext from '../hooks/useAuthContext';


export default function Header(){
    const navigate = useNavigate();

    const { hasLoggedIn, logout, currentUser} = useAuthContext();

    const pages = !hasLoggedIn ? ["Flats"]
      : currentUser?.role === "admin" 
      ? ["Flats","My flats", "Favourite Flats", "Dashboard"] 
      : ["Flats","My flats", "Favourite Flats"] ;

    const settings = hasLoggedIn ? ["Profile", "Logout"] : ["Sign Up", "Login"];

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorElNav(event.currentTarget);
    };

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
      setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };

    const handleMenuClick = (option: string) => {
      if(option == "Logout"){
        handleLogout()
      }else if(option == "Profile" && currentUser !== null){
        navigate(`/profile/${currentUser.id}`)
      }else{
        navigate(`${option.toLowerCase().replace(" ", "-")}`)
        handleCloseNavMenu();
        handleCloseUserMenu();
      }
    };

    const handleLogout = async () => {
      try {
        await logout();
        navigate("login")
        handleCloseUserMenu();
      }catch(error) {
        if (error instanceof Error) {
          console.error("error signing out header", error.message)
        } else {
          console.error("An unknown error occurred signing out header");
        }
        
      }
    }

    const fullName = `${currentUser?.firstName} ${currentUser?.lastName}`
    return (
        <AppBar position="static" sx={{bgcolor: "background.default"}}>
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              {/* Logo Desktop */}
              <ApartmentIcon sx={{ display: { xs: 'none', md: 'flex'},mr: 1 , color: "primary.main"}}/>
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'verdana',
                  fontWeight: 700,
                  letterSpacing: '.2rem',
                  color: "primary.main",
                  textDecoration: 'none',
                }}
              >
                FlatFinder
              </Typography>
              {/* Menu navigation mobile */}
              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  sx={{
                    color: "text.primary"
                  }}
                >
                <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    sx={{ display: { xs: 'block', md: 'none' } }}
                  >
                  {pages.map((page) => (
                      <MenuItem key={page} onClick={() => handleMenuClick(page)}>
                        <Typography sx={{ textAlign: 'center', color: "text.primary" }}>{page}</Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                  </Box>
                  {/* smaller screens */}
                  <ApartmentIcon sx={{ display: { xs: 'flex', md: 'none' }, color: "primary.main"}} />
                  <Typography
                  variant="h5"
                  noWrap
                  component="a"
                  href="#app-bar-with-responsive-menu"
                  sx={{
                      mr: 2,
                      display: { xs: 'flex', md: 'none' },
                      flexGrow: 1,
                      fontFamily: 'verdana',
                      fontWeight: 700,
                      letterSpacing: '0.1rem',
                      color: "primary.main",
                      textDecoration: 'none',
                  }}
                  >
                    FlatFinder
                  </Typography>
                  {/* Navigation buttons for large screens */}
                  <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                    {pages.map((page) => (
                      <Button
                        key={page}
                        onClick={()=>handleMenuClick(page)}
                        sx={{ my: 2, color: "text.primary", display: 'block'}}
                      >
                      {page}
                      </Button>
                    ))}
                  </Box>

                  {currentUser && (
                    <Typography color='text.secondary' sx={{paddingRight:"24px",display: {xs:"none",sm: "none", md: "block" } }}>Hello, {fullName}</Typography>
                  )}
                  
                {/* User profile */}
                <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <AccountCircleIcon sx={{ fontSize: 40 }}/>
                    </IconButton>
                  </Tooltip>
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
                  <MenuItem key={setting} onClick={() => handleMenuClick(setting)}>
                    <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                  </MenuItem>
                ))}
            </Menu>
          </Box>
          </Toolbar>
        </Container>
      </AppBar>
    )
}