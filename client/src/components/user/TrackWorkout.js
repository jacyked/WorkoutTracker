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


const TrackWorkout = () => {
  const theme = useTheme();
  const { auth } = useAuth();
  const [steps, setSteps] = useState(3);
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
  const [stepFunctions, setStepFunctions] = useState([
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
      fn(active, s){ return(<Container>
        <Typography variant="h6">Add Exercise</Typography>
        <Box sx={{p: {xs: 2, md: 3, lg: 4}, display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',}} >

            <LogExercise recTargets = {thisWorkout.pickTargets}/>
            <Button id="addButton" name ="addButton" label="Add" onClick={() => exToAdd(active, s)}>Add Next Exercise</Button>
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

  ])
  

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const submitWorkout = () => {
    console.log("Submitted");
    setActiveStep(0);
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


  function exToAdd(curStep, allSteps,){
    console.log("Passed in current Step: " + curStep);
    console.log("stepFunctions length: " + stepFunctions.length);
    let s = "Conditions: "
    stepFunctions.forEach((i) => (s = (s + i.condition + ", ")));
    console.log(s);
    const newStep = curStep + 1;
    const stepList = stepFunctions
    //for every step after current
    const after = [];
    for(let i = curStep; i < stepList.length; i++){
      let t = stepList.pop();
      t.condition = (t.condition + 1)
      after.push(t);
    }
    console.log("Steps after current: " + after.length)
    console.log("Current length of stepList before adding: " + stepList.length);
    stepList.push({
      condition: newStep,
      fn(active, s){ return(<Container>
        <Typography variant="h6">Add Exercise</Typography>
        <Box sx={{p: {xs: 2, md: 3, lg: 4}, display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',}} >
          <LogExercise recTargets = {thisWorkout.pickTargets}/>
            <Button id="addButton" name ="addButton" label="Add" onClick={() => exToAdd(active, s)}>Add Next Exercise</Button>
            <Button color="error" variant="outlined" id="deleteButton" name ="deleteButton" label="Delete" onClick={() => exToDelete(active, s)}>Delete</Button>
        </Box>
      </Container>);}
    });
    console.log("Pushed new step, now stepList lengt: " + stepList.length);
    let l = after.length;
    for(let i = 0; i < l; i++){
      let t = after.pop();
      stepList.push(t);
    }
    console.log("No. of Steps: " + allSteps + ", Length after adding: " + stepList.length);
    setSteps(allSteps + 1);
    setStepFunctions(stepList);
    stepFunctions.forEach((i) => {console.log(i.condition.toString())})
    console.log("Steps after add should be: " + (allSteps + 1) );
  }
  function exToDelete(curStep, allSteps){
    const after = [];
    const stepList = stepFunctions;
    for(let i = curStep; i < stepList.length; i++){
      let t = stepList.pop();
      t.condition = (t.condition - 1);
      after.push(t);
    }
    stepList.pop();
    let l = after.length;
    for(let i = 0; i < l; i++){
      let t = after.pop();
      stepList.push(t);
    }
    setSteps(allSteps - 1);
    setStepFunctions(stepList);


  }
  

  const RenderStep = () => {
      console.log("Active Step: " + activeStep + " / " + (steps - 1) + ", Total: " + steps);
      console.log("Length: " + stepFunctions.length);
      for(const { condition, fn} of stepFunctions){
        if(activeStep === condition){
          return(fn(activeStep, steps));
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
                      <Button size="small" onClick={(activeStep < (steps - 1))?handleNext:submitWorkout}>
                        {(activeStep === 0)?"Start":(activeStep === (steps - 2))?"Wrap Up":(activeStep === (steps-1))?"Save Workout":"Next"}
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