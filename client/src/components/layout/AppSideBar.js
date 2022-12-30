import React, { useState } from "react";
import { Link } from "react-router-dom";
import MuiDrawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import { MainListItems, SecondaryListItems } from "./ListItems.js";
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { styled } from '@mui/material/styles';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';

export const AppSideBar = (props) => { 

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
  
    const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
    };
  
    const handleCloseNavMenu = () => {
      setAnchorElNav(null);
    };
  
    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };

    return (
        <React.Fragment>
            <AppBar position="absolute">
            <Container maxWidth="xl" sx={{ display: "block"}}>
                <Toolbar disableGutters>
                <FitnessCenterIcon sx={{ display: "flex", mr: 1 }} />
                <Typography
                    variant="h6"
                    noWrap
                    component={ Link }
                    to="/"
                    sx={{
                    mr: 2,
                    display: 'flex' ,
                    fontWeight: 700,
                    letterSpacing: '.1rem',
                    color: '#fff',
                    textDecoration: 'none',
                    }}
                >
                    Workout Tracker
                </Typography>
                <Box sx={{ flexGrow: 1, display: 'flex' } }>

                </Box>

                <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title="Open Menu">
                    <IconButton
                        onClick={handleOpenUserMenu}
                        sx={{
                            p: 0
                        }}
                        >
                        <MenuIcon sx={{color: "#fff"}}/>
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
                    <MainListItems />
                    <Divider sx={{ my: 1 }} />
                    <SecondaryListItems />
                    </Menu>
                </Box>
                </Toolbar>
            </Container>
            </AppBar>
        </React.Fragment>

 
    );
}
