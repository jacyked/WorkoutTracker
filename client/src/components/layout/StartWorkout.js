import React, { useState, useEffect, useRef } from "react";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Slider from '@mui/material/Slider';
import { format } from 'date-fns';

//First page for beginning track workout flow
//Contains startDate, notes (check boxes and 'other' text input), and sleep quality
export const StartWorkout = (props) => {
      
    const [startDate, setStart] = useState(JSON.parse(localStorage.getItem("workout")).startDate || format(new Date(), "yyyy-MM-dd HH:mm"));
    const [notes, setNotes] = useState(JSON.parse(localStorage.getItem("workout")).notes || [])
    const [other, setOther] = useState(JSON.parse(localStorage.getItem("workout")).other || "")
    const [sleep, setSleep] = useState(JSON.parse(localStorage.getItem("workout")).sleep || 5)

    //Notes toggle for adding/removing from array
    const setNote = (note, checked) => {
        console.log("Note: " + note + ", Checked: " + checked);
        
        const arr = notes;
        console.log("Old Notes: " + arr.toString());
        if(checked){
            arr.push(note);
        }
        else{
          if(arr.includes(note)){
            arr.splice(arr.indexOf(note), 1);
          }
        }
        console.log("New notes: " + arr);
        setNotes(arr);
        let workout = JSON.parse(localStorage.getItem("workout"));
        workout.notes = arr;
        localStorage.setItem("workout", JSON.stringify(workout));
    }
    //Update notes in localStorage when changed
    useEffect(() => {
        let workout = JSON.parse(localStorage.getItem("workout"));
        workout.notes = notes;
        localStorage.setItem("workout", JSON.stringify(workout));
    }, [notes])
    //Update startDate in localStorage when changed
    useEffect(() => {
        let workout = JSON.parse(localStorage.getItem("workout"));
        workout.startDate = startDate;
        localStorage.setItem("workout", JSON.stringify(workout));
    }, [startDate])
    //Update other in localStorage when changed
    useEffect(() => {
        let workout = JSON.parse(localStorage.getItem("workout"));
        workout.other = other;
        localStorage.setItem("workout", JSON.stringify(workout));
    }, [other])
    //Update sleep in localStorage when changed
    useEffect(() => {
        let workout = JSON.parse(localStorage.getItem("workout"));
        workout.sleep = sleep;
        localStorage.setItem("workout", JSON.stringify(workout));
    }, [sleep])


    
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
            value={startDate}
            InputLabelProps={{shrink: true,}}
            onChange={(e) => {setStart(e.target.value)}} 
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
            value={other}
            onChange={(e) => setOther(e.target.value)}/>
            <Box sx={{ pt: 4}}>
            <Typography variant='subtitle1'>Sleep Quality: </Typography>
            <Slider
                aria-label="Sleep Quality"
                value={sleep}
                valueLabelDisplay="auto"
                min={0}
                max={10}
                track={false}
                marks= {[{value: 0, label: 'Worst'}, {value: 10, label: 'Best'},]}
                onChange= {(e) => setSleep(e.target.value)}
            />
            </Box>
            </Box>
            </Box>
        </Container>
    </React.Fragment>);


}
