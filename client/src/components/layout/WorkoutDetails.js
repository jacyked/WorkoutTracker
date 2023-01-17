import { ListItem, ListItemText } from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { GET_WO_URL, WEIGHTUNIT } from "../../constants";
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Loading from "./Loading";


//TODO configure server routes for getting workout by ID, as well as add onClick to navigate to this page passing workoutID as param
export const WorkoutDetails = (props) => {
    const { workoutID } = useParams();
    const axiosPrivate = useAxiosPrivate();
    const [isLoading, setLoading] = useState(false);
    const [workout, setWorkout] = useState({
        startDate: "", 
        endDate: "", 
        notes: [],
        other: '',
        sleep: '',
        exercises: [{index: -1, ex_id: "", name: "", sets: [{weight: -1, reps: -1}]}],
        targets: [],
        finalNote: "",
        default: true,
    });

    useEffect(() => {
        setLoading(true);
        let isMounted = true;
        const controller = new AbortController();
        //console.log(JSON.stringify(auth));
        console.log("Workout ID (for axios): " + workoutID)
        if(workout.startDate === ""){
          const getWorkout = async() => {
              try{
                  const response = await axiosPrivate.get((GET_WO_URL + workoutID) , {
                      signal: controller.signal,
                  });
                  console.log("Fired: get workout");
                  console.log("DATA: " + JSON.stringify(response.data));
                  isMounted && setWorkout(response.data);
                 
                  
              }catch(err){
                  console.error(err);
              }
    
          }
          getWorkout();
          }
          setLoading(false);
        return () => {
            console.log("cleanup, aborting getWorkout axios. ");
            isMounted = false;
            controller.abort();
        }
      }, [])
    
    return (
        <Container>
            {(isLoading)
            ?(
                <Loading />
            ):(
                <Box>
                <Typography variant="h5">Workout Details</Typography>
                <Box sx={{ p: {xs: 2, md: 3, lg: 4}}}>
                    <Typography variant="subtitle2">Start: {workout.startDate}</Typography>
                    <Typography variant="subtitle2">End: {workout.endDate}</Typography>
                    <Typography variant="subtitle2">Length: endDate - startDate</Typography>
                    <Typography variant="subtitle2">Muscles Targeted: {workout.targets.toString()}</Typography>
                    <Typography variant="subtitle2">Notes, Sleep, etc.</Typography>
                    {(Array.isArray(workout.exercises))
                    ?(
                        <List>
                            {workout.exercises.map((ex) => (
                                <ListItem key={ex._id}>
                                    <ListItemText primary={ex.name} secondary={ex.sets.map((set) => (
                                        <div>{set.weight}{WEIGHTUNIT}{" x "}{set.reps}</div>
                                    ))}/>
                                    
                                </ListItem>
                                
                            ))}
                        </List>
                    ) : (<Typography variant="subtitle1">No details to show</Typography>)}
                </Box>
                </Box>
            )}
            
        </Container>
    );
}