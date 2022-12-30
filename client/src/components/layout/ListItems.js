import * as React from 'react';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SportsGymnasticsIcon from '@mui/icons-material/SportsGymnastics';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import useLogout from '../../hooks/useLogout';
import { Typography } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';

//AppBar dropdown menu, main list
export const MainListItems = () => (
  <React.Fragment>
    <MenuItem component={Link} to="/">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </MenuItem>
    <MenuItem component={Link} to="/track">
      <ListItemIcon>
        <SportsGymnasticsIcon />
      </ListItemIcon>
      <ListItemText primary="Track Workout" />
    </MenuItem>
    <MenuItem component={Link} to="/exercises">
      <ListItemIcon>
        <FitnessCenterIcon />
      </ListItemIcon>
      <ListItemText primary="All Exercises" />
    </MenuItem>
  </React.Fragment>
);
//AppBar dropdown menu, secondary list
export const SecondaryListItems = () => {
  const navigate = useNavigate();
  const logout = useLogout();

  const signOut = async () => {
    await logout();
    navigate('/');

  }

  return (
    <React.Fragment>
      <MenuItem component={Link} to="/user">
        <ListItemIcon>
          <AccountCircleIcon />
        </ListItemIcon>
        <Typography textAlign="center">My Profile</Typography>
      </MenuItem>
      <MenuItem>
        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
        <Typography textAlign="center">Settings</Typography>
      </MenuItem>
      <MenuItem onClick={signOut}>
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <Typography textAlign="center">Log Out</Typography>
      </MenuItem>
    </React.Fragment>
  );
}