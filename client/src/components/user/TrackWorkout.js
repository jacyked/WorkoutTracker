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
import { muscleTypes, equipmentTypes } from "../layout/ExerciseResources";
import InputLabel from '@mui/material/InputLabel';
import NativeSelect from '@mui/material/NativeSelect';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Slider from '@mui/material/Slider';
import { format } from 'date-fns';


const TrackWorkout = () => {
  const theme = useTheme();
  const { auth } = useAuth();
  const [steps, setSteps] = useState(3);
  const [findExercise, setFindExercise] = useState("");
  const [exAdded, setExAdded] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [thisWorkout, setWorkout] = useState({ 
    userID: auth?.currUser?._id,
    startDate: format(new Date(), "yyyy-MM-dd hh:mm"), 
    endDate: "", 
    pickTargets: ["All"],
    calcTargets: [],
    notes: [],
    other: '',
    sleep: 5,
    exCount: 1,
    exercises: [{}],
    finalNote: "",

  });
  

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const toggleTarget = (target) => {
    const thisArr = thisWorkout.pickTargets;
    if(thisArr.includes(target)) {
      thisArr.splice(thisArr.indexOf(target));
    }
    else {
      thisArr.push(target);
    }
    setWorkout({
      ...thisWorkout,
      pickTargets: thisArr,});
  }

  const setNote = (note, checked) => {
    //console.log("Note: " + content + ", Checked: " + checked);
    //console.log("Old Notes: " + arr.toString());
    const arr = thisWorkout.notes;
    if(checked){
        arr.push(note);
    }
    else{
      if(arr.includes(note)){
        arr.splice(arr.indexOf(note));
      }
    }
    setWorkout({
      ...thisWorkout,
      notes: arr
    });
  }

  useEffect(()=> {console.log("State changed: " + JSON.stringify(thisWorkout));
  console.log("Current auth: " + JSON.stringify(auth))},[thisWorkout])

  const stepFunctions = [
    {
    condition: 0, 
    fn() {return(
          <Container>
          <Typography variant="h6">Before your workout</Typography>
          <Box sx={{p: {xs: 2, md: 3, lg: 4}, display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',}} >                
          
          <Box sx={{p: {xs: 1, md: 2, lg: 3}}}>
            <InputLabel variant="standard" htmlFor="targets">Desired Targets:</InputLabel>
            <NativeSelect variant="standard" value={thisWorkout.pickTargets} inputProps={{name: 'targets', id: 'targets', multiple:true}} onChange={(e) => toggleTarget(e.target.value)}>
              {muscleTypes.map((row) => (
                <option value={row}>{row}</option>
              ))}
            </NativeSelect>
          </Box>
          <Box sx={{ p: {xs: 2, md: 3, lg: 4}}}>
          <TextField 
          id="datetime-local" 
          label="Started at " 
          type="datetime-local" 
          required
          sx={{ width: 250 }}
          value={thisWorkout.startDate}
          InputLabelProps={{shrink: true,}}
          onChange={(e) => {setWorkout({
            ...thisWorkout,
            startDate: e.target.value})}} 
          />
          </Box>
          <Box sx={{ p: {xs: 2, md: 3, lg: 4}}}>
          <Typography variant="subtitle1">Notes: </Typography>
          <FormControlLabel
              control={<Checkbox id="yespre" value="yespre" color="primary" onChange={(e) => setNote(e.target.value, e.target.checked)}/>}
              label="I took preworkout"
          />
          <FormControlLabel
              control={<Checkbox id="nopre" value="nopre" color="primary" onChange={(e) => setNote(e.target.value, e.target.checked)}/>}
              label="No preworkout"
          />
          <FormControlLabel
              control={<Checkbox id="yesmeal" value="yesmeal" color="primary" onChange={(e) => setNote(e.target.value, e.target.checked)}/>}
              label="High carb meal before"
          />
          <FormControlLabel
              control={<Checkbox id="nomeal" value="nomeal" color="primary" onChange={(e) => setNote(e.target.value, e.target.checked)}/>}
              label="Not enough food before"
          />
          <TextField 
          id="other"
          name="other"
          label="Other: "
          value={thisWorkout.other}
          onChange={(e) => setWorkout({...thisWorkout,
          other: e.target.value})}/>
          <Box sx={{ pt: 4}}>
          <Typography variant='subtitle1'>Sleep Quality: </Typography>
          <Slider
            aria-label="Sleep Quality"
            value={thisWorkout.sleep}
            valueLabelDisplay="auto"
            min={0}
            max={10}
            track={false}
            marks= {[{value: 0, label: 'Worst'}, {value: 10, label: 'Best'},]}
            onChange= {(e) => setWorkout({...thisWorkout,
            sleep: e.target.value})}
          />
          </Box>
          </Box>
        </Box>
        </Container>);},
    },
    {
    condition: 1,
    fn(){ return(<Container>
      <Typography variant="h6">Exercise {activeStep}</Typography>
      <Box sx={{p: {xs: 2, md: 3, lg: 4}, display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',}} >
        <TextField 
          id="exSearch"
          name="exSearch"
          label="Find Exercise: "
          value={findExercise}
          onChange={(e) => setFindExercise(e.target.value)}/>
          <Button id="addButton" name ="addButton" label="Add" onClick={() => exToAdd(activeStep, steps)}>Add</Button>
      </Box>
    </Container>);},
    },
    {
    condition: steps - 1,
    fn(){return(<Container>
      <Typography variant="h6">Summary </Typography>
      <Box sx={{p: {xs: 2, md: 3, lg: 4}, display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',}} >
        <TextField 
          id="finalNote"
          name="finalNote"
          label="Final Notes: "
          value={thisWorkout.finalNote}
          onChange={(e) => setWorkout({...thisWorkout,
          finalNote: e.target.value})}/>
      </Box>
    </Container>);}
    },
  ]

  function exToAdd(curStep, allSteps){
    const newStep = curStep + 1;
    stepFunctions.push({
      condition: newStep,
      fn() {return(<p>Peepee</p>)}
    });
    setSteps(steps + 1);
    stepFunctions.forEach((i) => {console.log(i.condition.toString())})
    console.log("Steps: " + steps );
  }
  

  const RenderStep = () => {
      for(const { condition, fn} of stepFunctions){
        if(activeStep === condition){
          return(fn(activeStep));
          break;
        }
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
                  
                 {RenderStep()}
                  
                  <MobileStepper
                  variant="progress"
                  steps={steps}
                  position="static"
                  activeStep={activeStep}
                  sx={{ flexGrow: 1 }}
                    nextButton={
                      <Button size="small" onClick={handleNext} disabled={activeStep === (steps - 1)}>
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