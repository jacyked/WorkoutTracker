import React, { useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { muscleTypes, equipmentTypes, SEARCH_EX_URL } from "../../constants";

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
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

const OFFSET = 5;

export const LogExercise = (props) => {
    const recTargets = props.recTargets;
    const [findExercise, setFindExercise] = useState("");
    const [selected, setSelected] = useState(false);
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState([{id: "", fullName: "", mainMuscleName: "", rating: ""}]);
    const [count, setCount] = useState(0);
    const axiosPrivate = useAxiosPrivate();

    const searchExercise = async (e) => {
        e.preventDefault();
        setLoading(true);
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
                searchTerm: findExercise
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
            label="Find Exercise: "
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
                    //TODO come back and init click listener to select item
                      console.log("Clicked" + row.fullName)
                    }}>
                      <ListItemText primary={row.fullName}  secondary={"Targets: " + row.mainMuscleName + " Equipment: " + row?.equipmentTypes?.toString()}/>
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
                            ?<Looks4OutlinedIcon color="#B6E824"/>
                            :(parseFloat(row.rating) <= 10)
                            ?<Looks5OutlinedIcon color="success"/>
                            :<CheckBoxOutlineBlankOutlinedIcon/>
                            }
                        </ListItemIcon>
                    </ListItemButton>
                  ))}
                  <ListItemButton onClick={(e) => loadMore(e)}>

                  </ListItemButton>
                </List>
            ):(
                //display selected exercise view for entering sets/reps, equipment, etc
                <p>Default</p>

            )}
            </Box>
        </Container>
    </React.Fragment>);


}

