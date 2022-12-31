import { ListItem, ListItemText } from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect } from "react";
import { WEIGHTUNIT } from "../../constants";

export const WorkoutDetails = (props) => {
    const workout = JSON.parse(props.workout);
    
    return (
        <Container>
            <Typography variant="h6">Workout Details</Typography>
            <Box sx={{ p: {xs: 2, md: 3, lg: 4}}}>
                <Typography variant="subtitle2">Start: {workout.startDate}</Typography>
                <Typography variant="subtitle2">End: {workout.endDate}</Typography>
                <Typography variant="subtitle2">Length: math here</Typography>
                <Typography variant="subtitle2">Muscles Targeted: {workout.targets}</Typography>
                {(Array.isArray(workout.exercises))
                ?(
                    <List>
                        <Typography variant="subtitle1">Exercises </Typography>
                        {workout.exercises.map((ex) => {
                            <ListItem key={ex._id}>
                                <ListItemText primary={ex.fullName}/>
                                {ex.sets.map((set) => {
                                    <ListItemText inset={true} secondary={set.weight + WEIGHTUNIT + " x " + set.reps}/>
                                })
                                    
                                }
                            </ListItem>
                            
                        })}
                    </List>
                ) : (<Typography variant="subtitle1">No details to show</Typography>)}
            </Box>
        </Container>
    );
}