import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom"
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from '../../hooks/useAuth';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { AppSideBar } from '../layout/AppSideBar.js';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';


const TrackWorkout = () => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const RenderStep = () => {
    switch(activeStep){
      case 0:
        return(<Typography variant="h5">Step 0</Typography>);
        break;
      case 1:
        return(<Typography variant="h6">Step 1</Typography>);
        break;
      default:
        return(<Typography variant="h4">Ki has small PP</Typography>);
    }
  }

    return (
      <React.Fragment>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppSideBar title = "Track a Workout"/>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Paper
                  sx={{
                    p: {xs: 'none', md: 1, lg: 2},
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                    <RenderStep />
                     <MobileStepper
                      variant="progress"
                      steps={6}
                      position="static"
                      activeStep={activeStep}
                      sx={{ maxWidth: 400, flexGrow: 1 }}
                      nextButton={
                        <Button size="small" onClick={handleNext} disabled={activeStep === 5}>
                          Next
                          {theme.direction === 'rtl' ? (
                            <KeyboardArrowLeft />
                          ) : (
                            <KeyboardArrowRight />
                          )}
                        </Button>
                      }
                      backButton={
                        <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                          {theme.direction === 'rtl' ? (
                            <KeyboardArrowRight />
                          ) : (
                            <KeyboardArrowLeft />
                          )}
                          Back
                        </Button>
                      }
                    />
                </Paper>
          </Container>
        </Box>
      </Box> 
    </React.Fragment>
    )
}



export default TrackWorkout;