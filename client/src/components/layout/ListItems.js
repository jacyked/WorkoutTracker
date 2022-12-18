import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
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

export const MainListItems = (
  <React.Fragment>
    <ListItemButton component={Link} to="/">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
    <ListItemButton component={Link} to="/track">
      <ListItemIcon>
        <SportsGymnasticsIcon />
      </ListItemIcon>
      <ListItemText primary="Track Workout" />
    </ListItemButton>
    <ListItemButton component={Link} to="/exercises">
      <ListItemIcon>
        <FitnessCenterIcon />
      </ListItemIcon>
      <ListItemText primary="All Exercises" />
    </ListItemButton>
  </React.Fragment>
);

export const SecondaryListItems = () => {
  const navigate = useNavigate();
  const logout = useLogout();

  const signOut = async () => {
    await logout();
    navigate('/');

  }

  return (
    <React.Fragment>
      <ListSubheader component="div" inset>
        Options
      </ListSubheader>
      <ListItemButton component={Link} to="/user">
        <ListItemIcon>
          <AccountCircleIcon />
        </ListItemIcon>
        <ListItemText primary="My Account" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
        <ListItemText primary="Settings" />
      </ListItemButton>
      <ListItemButton onClick={signOut}>
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary="Log Out" />
      </ListItemButton>
    </React.Fragment>
  );
}