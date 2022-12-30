import React, { useState, useEffect } from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import TextField from '@mui/material/TextField';
import { IconButton } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import CloseIcon from '@mui/icons-material/Close';
import { WEIGHTUNIT } from "../../constants";


export default function ExerciseDrawer(props) {
    const ex_id = props.exercise.ex_id;
    const length = props.count;
    const index = props.exercise.index;
    const name = props.exercise.name;
    const [sets, setSets] = useState([{weight: -1, reps: -1}]);
    const [weight, setWeight] = useState("");
    const [reps, setReps] = useState("");
    const [open, setOpen] = useState((index === (length - 1))?true:false);
  
    const handleClick = () => {
      setOpen(!open);
    };

    function addSet(){
        //console.log("Add set triggered");
        let arr = sets;
        if(arr[0].reps <= 0)
            arr = [{weight, reps}]
        else
            arr.push({weight, reps});
        
        
        
        //Find in local
        let workout = JSON.parse(localStorage.getItem("workout"));
        let thisEx = workout.exercises.findIndex(ex => ex.ex_id === ex_id);
        //console.log("ID " + ex_id + "Found at index " + thisEx + ", old sets: " + JSON.stringify(workout.exercises[thisEx].set));
        if (workout.exercises[thisEx].sets[0].reps <= 0)  
            workout.exercises[thisEx].sets = [{weight, reps}];
        else{
            let newSet = {weight, reps};
            let oldSets = workout.exercises[thisEx].sets;
            oldSets.push(newSet);
            workout.exercises[thisEx].sets = oldSets;
        }
        localStorage.setItem("workout", JSON.stringify(workout));
        setSets(workout.exercises[thisEx].sets);
        setReps("");
        setWeight("");

        
        
    }
    useEffect(() => {
        let workout = JSON.parse(localStorage.getItem("workout"));
        let thisEx = workout.exercises.findIndex(ex => ex.ex_id === ex_id);
        setSets(workout.exercises[thisEx].sets);
  
    }, [ex_id]) 


return (
<List dense={true}>
    <ListItemButton onClick={handleClick}>
    <ListItemText primary={name} />
    {open ? <ExpandLess /> : <ExpandMore />}
    </ListItemButton>
    <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding inset={true} dense={true}>
        
        {(!Array.isArray(sets))? (
                <React.Fragment></React.Fragment>
            ):(!(sets[0].reps <= 0))?(
                sets.map((set) => (
                    <ListItemText inset={true} primary={set.weight + " " + WEIGHTUNIT + " x " + set.reps + " reps"}/>
                ))
                
            ): (
                <React.Fragment></React.Fragment>
            )}
            <ListItemButton sx={{ pl: 4 }}>
                <TextField type="number" label="weight" min={0} value={weight} onChange={(e) => {setWeight(e.target.value)}}/> <CloseIcon /> <TextField type="number" label="reps" min={0} value={reps} onChange={(e) => {setReps(e.target.value)}}/>
                <IconButton edge="end" aria-label="add" color="primary" onClick={() => {addSet(); /*console.log("Saving weight " + weight + " x reps " + reps)*/}}>
                                <AddBoxIcon fontSize="large"/>
                </IconButton> 
            </ListItemButton>
        </List>
    </Collapse>
</List>
);
}