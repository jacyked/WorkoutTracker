import React, { useState} from "react";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from '../../hooks/useAuth';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { AppSideBar } from '../layout/AppSideBar.js';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { SAVE_WO_URL } from "../../constants";
import { format } from 'date-fns';
import { LogExercise } from "../layout/LogExercise";
import { StartWorkout } from '../layout/StartWorkout';
import { EndWorkout } from '../layout/EndWorkout';

//Container of track workout flow
//Controles step with associated page, as well as initiate/submit workout 
const TrackWorkout = () => {
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const theme = useTheme();
  const navigate = useNavigate();
  const [isInit, setInit] = useState(false);
  const [steps, setSteps] = useState(3);
  const [activeStep, setActiveStep] = useState(0);
  const [thisWorkout, setWorkout] = useState();

  //Corresponding page for each step
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

  //Save workout from localstorage to database, then direct user to homepage
  const submitWorkout = async () => {
    console.log("Save workout for: " + auth.currUser.username);
    try{
      const response = await axiosPrivate.post(SAVE_WO_URL, {
          workout: localStorage.getItem("workout"),
        
    });
    }catch(err){
      console.log("Unable to save workout to server. Saving backup to local storage");
      localStorage.setItem("backup", localStorage.getItem("workout"));
    }
    console.log("Submitted");
    localStorage.removeItem("workout");
    navigate("/");
  };
  
//Determines which step to display based on active step stored in state
  const RenderStep = () => {
      console.log("Active Step: " + activeStep + " / " + (steps - 1) + ", Total: " + steps);
      for(const { condition, fn} of stepFunctions){
        if(activeStep === condition){
          return(fn(activeStep, steps));
          break;
        }
      }
  
  }

  //Initial loading of workout to/from localStorage.
  const init = () => {
    console.log("Init Fired in trackWorkout ")
    if (!isInit){
      console.log("Init false, proceed")
      //Check if workout has been started in local. 
      //TODO impliment a "Workout has been started but not saved, continue/discard" popup if found in local
      let workout = JSON.parse(localStorage.getItem("workout"))
      // If found, save in state
      if(workout){
        setWorkout(workout)
        console.log("Workout found in local, saving to state. ")
      }
      //If not found, create, save in storage, and then save in state
      else{
        let workout = {
          userID: auth?.currUser?._id,
          startDate: format(new Date(), "yyyy-MM-dd HH:mm"), 
          endDate: "", 
          notes: [],
          other: '',
          sleep: '',
          exercises: [{index: -1, ex_id: "", name: "", sets: [{weight: -1, reps: -1}]}],
          targets: [],
          finalNote: "",
          default: true,
        }
        localStorage.setItem("workout", JSON.stringify(workout));
        setWorkout(workout);
        console.log("No workout in local, created and now saved. ");
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