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

export const StartWorkout = (props) => {
    const { auth } = useAuth();
    const [thisWorkout, setWorkout] = useState({ 
        userID: auth?.currUser?._id,
        startDate: format(new Date(), "yyyy-MM-dd HH:mm"), 
        endDate: "", 
        notes: [],
        other: '',
        sleep: 5,
        exCount: 1,
        exercises: [{}],
        finalNote: "",
    
      });
      
    const [startDate, setStart] = useState(JSON.parse(localStorage.getItem("workout")).startDate || format(new Date(), "yyyy-MM-dd HH:mm"));
    const [notes, setNotes] = useState(JSON.parse(localStorage.getItem("workout")).notes || [])
    const [other, setOther] = useState(JSON.parse(localStorage.getItem("workout")).other || "")
    const [sleep, setSleep] = useState(JSON.parse(localStorage.getItem("workout")).other || "")


    const setNote = (note, checked) => {
        //console.log("Note: " + content + ", Checked: " + checked);
        //console.log("Old Notes: " + arr.toString());
        const arr = notes;
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
    
    return(
    <React.Fragment>
        <Container>
            <Typography variant="h6">Before your workout</Typography>
            <Box sx={{p: {xs: 2, md: 3, lg: 4}, display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',}} >                
            
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
        </Container>
    </React.Fragment>);


}

