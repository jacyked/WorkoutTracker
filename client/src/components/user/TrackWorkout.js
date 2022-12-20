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
import TextField from '@mui/material/TextField';
import { muscleTypes, equipmentTypes } from "../layout/ExerciseResources";
import InputLabel from '@mui/material/InputLabel';
import NativeSelect from '@mui/material/NativeSelect';


const TrackWorkout = () => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [targets, setTargets] = useState([]);
  const [thisWorkout, setWorkout] = useState();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const toggleTarget = (target) => {
    const arr = targets;
    if(arr.includes(target)) {
      arr.splice(arr.indexOf(target));
    }
    else {
      arr.push(target);
    }
    setTargets(arr);
  }

  useEffect(()=> {console.log("Targets changed: " + targets.toString())},[targets])

   
  

  const RenderStep = () => {
    switch(activeStep){
      case 0:
        return(
          <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} sx={{p: {xs: 2, md: 3, lg: 4}}}>
            <Typography variant="h5">Before your workout: </Typography>
          </Grid>
          
          <Grid item xs={12} sm={4} sx={{
                      p: {xs: 1, md: 2, lg: 3}
                    }}>
            <InputLabel variant="standard" htmlFor="targets">Desired Targets:</InputLabel>
            <NativeSelect variant="standard" value={targets} inputProps={{name: 'targets', id: 'targets', multiple:true}} onChange={(e) => toggleTarget(e.target.value)}>
              {muscleTypes.map((row) => (
                <option value={row}>{row}</option>
              ))}
            </NativeSelect>
          </Grid>
          <Grid item xs={12} sm={4} sx={{
                      p: {xs: 2, md: 3, lg: 4}
                    }}>
          <TextField 
          id="datetime-local" 
          label="Started at " 
          type="datetime-local" 
          required
          sx={{ width: 250 }}
          value={startDate}
          InputLabelProps={{shrink: true,}}
          onChange={(e) => {setStartDate(e.target.value)}} 
          
          />
          </Grid>
        </Grid>);
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
          <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
                <Paper
                  sx={{
                    p: {xs: 1, md: 2, lg: 3},
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
                  sx={{ flexGrow: 1 }}
                    nextButton={
                      <Button size="small" onClick={handleNext} disabled={activeStep === 5}>
                        {(activeStep === 0)?"Start":"Next"}
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