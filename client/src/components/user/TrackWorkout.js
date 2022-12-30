import React, { useState, useEffect, useRef } from "react";
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
import { muscleTypes, equipmentTypes } from "../../constants";
import InputLabel from '@mui/material/InputLabel';
import NativeSelect from '@mui/material/NativeSelect';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Slider from '@mui/material/Slider';
import { format } from 'date-fns';
import { LogExercise } from "../layout/LogExercise";
import { StartWorkout } from '../layout/StartWorkout';
import { EndWorkout } from '../layout/EndWorkout';


const TrackWorkout = () => {
  const theme = useTheme();
  const [isInit, setInit] = useState(false);
  const { auth } = useAuth();
  const [steps, setSteps] = useState(3);
  const [activeStep, setActiveStep] = useState(0);
  const [thisWorkout, setWorkout] = useState({ 
    userID: auth?.currUser?._id,
    startDate: "", 
    endDate: "", 
    pickTargets: ["All"],
    calcTargets: [],
    notes: [],
    other: '',
    sleep: 5,
    exCount: 1,
    exercises: [{index: -1, ex_id: "", name: "", sets: [{weight: -1, reps: -1}]}],
    finalNote: "",
    default: true,

  });

  useEffect(() => {
    console.log("UseEffect Triggered on TrackWorkout.");
    if(thisWorkout?.default){
      console.log("Default true, check in localstorage.");
      
      try{
        let workout = JSON.parse(localStorage.getItem("workout"));
        if(!workout) throw new Error("Null")
        console.log("Found and parsed. Setting to thisWorkout.");
        workout.default = false;
        setWorkout(workout);
      }catch(err){
        console.log("Not there or not able to parse. Create default in local");
        setWorkout({...thisWorkout, default: false});
        localStorage.setItem("workout", JSON.stringify(thisWorkout));
      }
    }
    else{
      console.log("Not default, checking for changes");
      if(thisWorkout == JSON.parse(localStorage.getItem("workout"))){
        console.log("No changes made, don't need to update");
      }else{
        console.log("Changes made, need to update")
      }
    }
  }, [])


  const stepFunctions = [
    {
      condition: 0, 
      fn() {return(
          <Container>
            <StartWorkout />
          </Container>);},
      },
      {
      condition: 1,
      fn(){ return(<Container>
        <Typography variant="h6">Add Exercise</Typography>
        <Box sx={{p: {xs: 1, md: 3, lg: 4}, display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',}} >

            <LogExercise />

        </Box>
      </Container>);},
      },
      {
      condition: steps - 1,
      fn(){return(<Container>
        <Typography variant="h6">Summary </Typography>
        <Box sx={{p: {xs: 1, md: 3, lg: 4}, display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',}} >
            <EndWorkout />
        </Box>
      </Container>);}
      },

  ];
  

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const submitWorkout = () => {
    console.log("Submitted");
    localStorage.removeItem("workout");
    setActiveStep(0);
  };
  

  const RenderStep = () => {
      console.log("Active Step: " + activeStep + " / " + (steps - 1) + ", Total: " + steps);
      for(const { condition, fn} of stepFunctions){
        if(activeStep === condition){
          return(fn(activeStep, steps));
          break;
        }
      }
  
  }
  const init = () => {
    console.log("Init Fired in trackWorkout ")
    if (!isInit){
      //Check if workout has been started in local. 
      //TODO impliment a "Workout has been started but not saved, continue/discard" popup if found in local
      let workout = JSON.parse(localStorage.getItem("workout"))
      // If found, save in state
      if(workout){
        setWorkout(workout)
      }
      //If not found, create, save in storage, and then save in state
      else{
        let workout = {
          userID: auth?.currUser?._id,
          startDate: "", 
          endDate: "", 
          notes: [],
          other: '',
          sleep: '',
          exercises: [{index: -1, ex_id: "", name: "", sets: [{weight: -1, reps: -1}]}],
          finalNote: "",
          default: true,
        }
        localStorage.setItem("workout", JSON.stringify(workout));
        setWorkout(workout);
      }

      setInit(true)
    }
    return(<React.Fragment></React.Fragment>)
  }

    return (
      <React.Fragment>
        {init()}
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
                  
                 {RenderStep()}
                  
                  <MobileStepper
                  variant="progress"
                  steps={steps}
                  position="static"
                  activeStep={activeStep}
                  sx={{ flexGrow: 1,}}
                    nextButton={
                      <Button size="small" onClick={(activeStep < (steps - 1))?handleNext:submitWorkout}>
                        {(activeStep === 0)?"Start":(activeStep === (steps - 2))?"Wrap Up":(activeStep === (steps-1))?"Save":"Next"}
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