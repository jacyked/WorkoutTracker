import React, { useState } from 'react';
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


export default function ExerciseDrawer(props) {
    const ex_id = props.exercise.ex_id;
    const length = props.length;
    const index = props.exercise.index;
    const name = props.exercise.name;
    const [sets, setSets] = useState(props.exercise.sets);
    const [weight, setWeight] = useState(0);
    const [reps, setReps] = useState(0);
    const [open, setOpen] = useState((index === (length - 1))?true:false);
  
    const handleClick = () => {
      setOpen(!open);
    };

    function addSet(){
        console.log("Add set triggered");
        let arr = sets;
        if(arr[0].reps <= 0)
            arr = [{weight, reps}]
        else
            arr.push({weight, reps});
        setSets(sets);
        
        //Update local storage at this point.
        
    }

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
                    <ListItemText primary={set.weight + " x " + set.reps}/>
                ))
                
            ): (
                <React.Fragment></React.Fragment>
            )}
            <ListItemButton sx={{ pl: 4 }}>
                <TextField type="number" label="weight" value={weight} onChange={(e) => {setWeight(e.target.value)}}/> x <TextField type="number" label="reps" value={reps} onChange={(e) => {setReps(e.target.value)}}/>
                <IconButton edge="end" aria-label="add" colour="primary" onClick={() => {addSet(); console.log("Saving weight " + weight + " x reps " + reps)}}>
                                <AddBoxIcon />
                </IconButton> 
            </ListItemButton>
        </List>
    </Collapse>
</List>
);
}