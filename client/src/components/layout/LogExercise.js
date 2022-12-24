import React, { useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { muscleTypes, equipmentTypes, SEARCH_EX_URL } from "../../constants";

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { ListItem, Typography } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import LinearProgress from '@mui/material/LinearProgress';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CheckBoxOutlineBlankOutlinedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined';
import LooksOneOutlinedIcon from '@mui/icons-material/LooksOneOutlined';
import LooksTwoOutlinedIcon from '@mui/icons-material/LooksTwoOutlined';
import Looks3OutlinedIcon from '@mui/icons-material/Looks3Outlined';
import Looks4OutlinedIcon from '@mui/icons-material/Looks4Outlined';
import Looks5OutlinedIcon from '@mui/icons-material/Looks5Outlined';
import AddBoxIcon from '@mui/icons-material/AddBox';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';


const OFFSET = 5;

export const LogExercise = () => {
    const [open, setOpen] = useState([false])
    const [exercises, setExercises] = useState([{index: -1, ex_id: "", name: "", sets: [{weight: -1, reps: -1}]}]);
    const [defaultResults, setDefault] = useState(true);
    const [findExercise, setFindExercise] = useState("");
    const [selected, setSelected] = useState(false);
    const [selectedEx, setSelectedEx] = useState({id: "", fullName: "", mainMuscleName: "", rating: "", equipmentTypes: []});
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState([{id: "", fullName: "", mainMuscleName: "", rating: "", equipmentTypes: []}]);
    const [count, setCount] = useState(0);
    const [numEx, setNumEx] = useState(0);
    const axiosPrivate = useAxiosPrivate();

    const searchExercise = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSelected(false);
        console.log("Searching for: " + findExercise);
        //Search axios for matching exercises
        try{
            const response = await axiosPrivate.get(SEARCH_EX_URL, {
                params: {
                limit: OFFSET,
                skip: 0,
                searchTerm: findExercise
                }
            });
        //TODO if returned list < limit, add end of results flag
        console.log("Request made for search");
        console.log("Results: " + JSON.stringify(response.data));
        const list = Array.from(response.data);
        list.forEach((i) => {
          console.log(i.fullName)})
        setResults(list);
        setCount(count + 1);
        }catch(err){
            console.error(err);
        }
        setLoading(false);
    }

    const loadMore = async (e) => {
        setLoading(true);
        try{
          const response = await axiosPrivate.get(SEARCH_EX_URL, {
              params: {
                limit: OFFSET,
                skip: (count * OFFSET),
                searchTerm: findExercise,
                
                //TODO if returned list < limit, add end of results flag
              }
          });
          //console.log("Fired: Load More");
          //console.log("DATA: " + JSON.stringify(response.data));
          const list = Array.from(response.data);
          list.forEach((i) => {
            console.log(i.fullName)})
          setResults(results.concat(list));
          setLoading(false);
          setCount(count + 1);
  
          
        }catch(err){
            console.error(err);
        }
  
      }
      function checkLocal() {
        //if exercises is default value, check localstorage
        console.log("Checking Local for exercises")
        if(exercises[0].index === -1){
            try{
                let work = JSON.parse(localStorage.getItem("workout"))
                let arr = work.exercises;
                if(!arr) console.log("Ex list Blank");
                else{
                    console.log("Ex list found, first index: " + arr[0].index)
                    setExercises(arr);
                }
            }catch(err){
                console.log("error retriving exercises from localstorage or parsing:")
                console.log(err);
            }

        }
      }
      const addEx = (ex) => {
        console.log("Adding: " + ex.fullName);
        console.log("To: " + JSON.stringify(exercises))
        //if default value, replace placeholder with new ex
        if(exercises[0].index === -1){
            
            let arr = [{index: 0, ex_id: ex._id, name: ex.fullName, sets: [{weight: 0, reps: 0}]}]
            console.log("Index is default, replace with " + JSON.stringify(arr))
            setExercises(arr);
            setOpen([true])
            console.log("Exercise list after replace: " + JSON.stringify(exercises));
        }
        //otherwise, add to array
        else{
            console.log("Index is not default, add")
            setExercises(exercises.push({index: exercises.length, ex_id: ex._id, name: ex.fullName, sets: [{weight: 0, reps: 0}]}));
            let arr = new Array(exercises.length);
            for (let i = 0; i < arr.length; i++){
                arr[i] = false;
            }
            arr[arr.length - 1] = true;
            setOpen(arr);

        }
        //console.log("Exercise list after function: " + JSON.stringify(exercises));
      }

      useEffect(() => {
        console.log("State changed, current ex list: " + JSON.stringify(exercises));
        setLoading(true);
        //Check local storage and update exercise list if needed
        checkLocal();
        console.log("Starting ex list: " + JSON.stringify(exercises));
        let isMounted = true;
        const controller = new AbortController();
        if(defaultResults){
        //console.log(JSON.stringify(auth));
        const getDefault = async() => {
            try{
                //All User routes removed the signal in axios request. may want to reinstate
                const response = await axiosPrivate.get(SEARCH_EX_URL, {
                    signal: controller.signal,
                    params: {
                      limit: OFFSET,
                      skip: 0,
                      
                    }
                });
                //console.log("Fired: Exercises");
                //console.log("DATA: " + JSON.stringify(response.data));
                //const test = JSON.parse(response.data);
                //console.log("Parsed: " + test);

                //response.data.forEach(e => console.log("Element " + JSON.stringify(e)))
                //response.data[0].forEach(console.log("ForEach sent"))
                const list = Array.from(response.data);
                isMounted && setResults(list);
                //setAuth({...auth.prev, curUser: response.data});
                //console.log("User: " + JSON.stringify(response.data));
                
            }catch(err){
                console.error(err);
            }
  
        }
        getDefault();
        setLoading(false);
    }
    return () => {
        console.log("cleanup, aborting exercises axios. ");
          isMounted = false;
          controller.abort();
      }
    }, [])
    const handleClick = (e) => {
        let id = e.target.id;
        console.log("Click toggle: " + id)
        const arr = open;
        if(arr.includes(id)){
            let index = arr.indexOf(id);
            if(arr[index])
                arr[index] = false;
            else
                arr[index] = true;
        }
      };

    return(
    <React.Fragment>
        <Container>
        <TextField 
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton aria-label="search" colour="primary" onClick={(e) => searchExercise(e)}>
                                <SearchIcon />
                            </IconButton> 
                        </InputAdornment>
                    ),
                }} 
            id="exSearch"
            name="exSearch"
            label="Add Exercise "
            value={findExercise}
            onChange={(e) => setFindExercise(e.target.value)}/>
            <Box>
            {(loading)
            ?(
                //loading
                < LinearProgress maxWidth={400}/>
            ):(!selected)?(
                //display search results or default reccomended list
                <List dense={true}>
                {results.map((row) => (
                    <ListItemButton key={row._id} onClick={() => {
                        console.log("Row before: " + JSON.stringify(selectedEx));
                        setSelectedEx(row);
                        console.log("Row after: " + JSON.stringify(selectedEx));
                        setSelected(true);
                        console.log("Adding: " + row.fullName)
                        console.log("To: " + JSON.stringify(exercises))
                        //if default value, replace placeholder with new ex
                        if(exercises[0].index === -1){
                            
                            let arr = [{index: 0, ex_id: row._id, name: row.fullName, sets: [{weight: 0, reps: 0}]}]
                            console.log("Index is default, replace with " + JSON.stringify(arr))
                            setExercises(arr);
                            setOpen([true])
                            console.log("Exercise list after replace: " + JSON.stringify(exercises));
                        }
                        //otherwise, add to array
                        else{
                            console.log("Index is not default, add")
                            setExercises(exercises.push({index: exercises.length, ex_id: row._id, name: row.fullName, sets: [{weight: 0, reps: 0}]}));
                            let arr = new Array(exercises.length);
                            for (let i = 0; i < arr.length; i++){
                                arr[i] = false;
                            }
                            arr[arr.length - 1] = true;
                            setOpen(arr);

                        }
                    }}>
                      <ListItemText primary={row.fullName}  secondary={<React.Fragment><div>Targets:  {row.mainMuscleName} </div><div>Equipment: {row?.equipmentTypes?.toString()}</div></React.Fragment>}/>
                        <ListItemIcon edge="end">
                            {(parseFloat(row.rating) <= 0)
                            //invalid
                            ? <CheckBoxOutlineBlankOutlinedIcon />
                            //valid
                            :(parseFloat(row.rating) <= 2)
                            ? <LooksOneOutlinedIcon />
                            :(parseFloat(row.rating) <= 4)
                            ? <LooksTwoOutlinedIcon color="error"/>
                            :(parseFloat(row.rating) <= 6)
                            ?<Looks3OutlinedIcon color="warning"/>
                            :(parseFloat(row.rating) <= 8)
                            ?<Looks4OutlinedIcon style={{color: '#b6e824'}}/>
                            :(parseFloat(row.rating) <= 10)
                            ?<Looks5OutlinedIcon color="success"/>
                            :<CheckBoxOutlineBlankOutlinedIcon/>
                            }
                        </ListItemIcon>
                        
                        <IconButton edge="end" aria-label="add" colour="primary">
                                <AddBoxIcon />
                        </IconButton> 
                        
                    </ListItemButton>
                  ))}
                  <ListItemButton onClick={(e) => loadMore(e)}>
                    <ListItemText primary="Load More..." />
                    <ListItemIcon edge="bottom">
                        <KeyboardArrowDownIcon />
                    </ListItemIcon>
                  </ListItemButton>
                </List>
            ):(
                //display selected exercise view for entering sets/reps, equipment, etc
                <List>
                    <ListItemText primary= {"Adding : " + selectedEx.fullName}/>
                </List>

            )}
            {(exercises[0].index != -1)? (exercises.map((ex) => (
                <List>
                    <ListItemButton id={ex.index} value={ex.index} onClick={handleClick}>
                      <ListItemText primary={ex.name} />
                      {open[ex.index] ? <ExpandLess id={ex.index}/> : <ExpandMore id={ex.index}/>}
                    </ListItemButton>
                    <Collapse in={open[ex.index]} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        {ex.sets.forEach((set, i) => (
                            <ListItemButton sx={{ pl: 4 }} id={ex.index}>
                            <ListItemText primary= {set.weight + " x " + set.reps} />
                            </ListItemButton>
                        ))}
                      </List>
                    </Collapse>
                </List>
            ))):(
                <List>
                    <ListItemText primary="No valid exercises to show"/>
                </List>
            )

            }
            </Box>
        </Container>
    </React.Fragment>);


}

